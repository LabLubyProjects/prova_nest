import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleService],
})
export class RoleModule {}
