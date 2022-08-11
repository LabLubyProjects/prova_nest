import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthInput } from './dto/auth.input';
import { AuthType } from './dto/auth.type';
import * as crypto from 'node:crypto';
import { DateTime } from 'luxon';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResetInput } from './dto/reset.input';
import { produce } from 'src/messaging/kafka';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.findByEmail(data.email);
    const validPassword = compareSync(data.password, user.password);
    if (!validPassword) throw new UnauthorizedException('Access denied');
    const token = await this.jwtToken(user);
    return {
      user,
      token,
    };
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { username: user.name, sub: user.id };
    return this.jwtService.signAsync(payload);
  }

  public async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);
    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiration = DateTime.now().plus({ hour: 1 }).toJSDate();
    user.password_recovery_token = token;
    user.password_recovery_token_expiration = tokenExpiration;
    await this.userRepository.save(user);
    await produce(
      {
        ...user,
        passwordRecoverToken: user.password_recovery_token,
      },
      'forgot-password',
    );
  }

  public async resetPassword(data: ResetInput): Promise<void> {
    const user = await this.userService.findByEmail(data.email);
    if (data.token !== user.password_recovery_token)
      throw new BadRequestException('Invalid token');

    if (DateTime.now().toJSDate() > user.password_recovery_token_expiration)
      throw new BadRequestException('Token expired');

    user.password = data.newPassword;
    user.password_recovery_token = null;
    user.password_recovery_token_expiration = null;

    await this.userRepository.save(user);
  }
}
