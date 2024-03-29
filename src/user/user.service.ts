import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DateTime } from 'luxon';
import { RoleService } from 'src/role/role.service';
import { MoreThan, Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { PaginateInput } from '../helpers/paginate.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private roleService: RoleService,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    if (
      (await this.userRepository.findOne({
        where: { cpf: createUserInput.cpf },
      })) ||
      (await this.userRepository.findOne({
        where: { email: createUserInput.email },
      }))
    )
      throw new UnprocessableEntityException('User already exists');

    const playerRole = await this.roleService.findByName('player');
    const newUser = this.userRepository.create(createUserInput);
    newUser.roles = [playerRole];

    await this.userRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(newUser);
      },
    );
    return newUser;
  }

  async findAll(pagination?: PaginateInput): Promise<User[]> {
    if (pagination) {
      return this.userRepository.find({
        take: pagination.perPage || 10,
        skip: pagination.page * pagination.perPage || 0,
      });
    }

    return this.userRepository.find();
  }

  async findAllWithBets(pagination?: PaginateInput): Promise<User[]> {
    if (pagination) {
      return this.userRepository.find({
        relations: {
          bets: true,
        },
        where: {
          bets: {
            created_at: MoreThan(DateTime.now().minus({ month: 1 }).toJSDate()),
          },
        },
        take: pagination.perPage || 10,
        skip: pagination.page * pagination.perPage || 0,
      });
    }

    return this.userRepository.find({
      relations: {
        bets: true,
      },
      where: {
        bets: {
          created_at: MoreThan(DateTime.now().minus({ month: 1 }).toJSDate()),
        },
      },
    });
  }

  async findAllWithSpecifiedRole(role: string): Promise<User[]> {
    return this.userRepository.find({
      relations: {
        roles: true,
      },
      where: {
        roles: {
          name: role,
        },
      },
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id: id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email: email } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    const userToUpdate = await this.findOne(id);
    return this.userRepository.save({ ...userToUpdate, ...updateUserInput });
  }

  async remove(id: string): Promise<User> {
    const userToDelete = await this.findOne(id);
    const isDeleted = await this.userRepository.delete(userToDelete.id);
    if (!isDeleted)
      throw new InternalServerErrorException('Could not delete user');
    return userToDelete;
  }

  async grantRoles(id: string, roles: string[]): Promise<User> {
    const userToGrant = await this.findOne(id);
    await Promise.all(
      roles.map(async (role) => {
        if (!userToGrant.roles.some((userRole) => userRole.name === role)) {
          const newUserRole = await this.roleService.findByName(role);
          userToGrant.roles.push(newUserRole);
        }
      }),
    );
    await this.userRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(userToGrant);
      },
    );
    return this.findOne(id);
  }
}
