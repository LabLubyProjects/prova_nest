import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async findByName(name: string): Promise<Role> {
    const role = await this.roleRepository.findOne({ where: { name: name } });
    if (!role) throw new NotFoundException('Role not found');
    return role;
  }
}
