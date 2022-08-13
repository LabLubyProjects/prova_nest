import { Role } from 'src/role/entities/role.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export class RoleSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<void> {
    const roleRepository = dataSource.getRepository(Role);

    const adminRoleData = {
      name: 'admin',
      description: 'Access all system features',
    };

    const playerRoleData = {
      name: 'player',
      description: 'Access player features',
    };

    const adminRole = roleRepository.create(adminRoleData);
    await roleRepository.save(adminRole);

    const playerRole = roleRepository.create(playerRoleData);
    await roleRepository.save(playerRole);
  }
}
