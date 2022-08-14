import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { MainSeeder } from './MainSeeder';

export const options: DataSourceOptions & SeederOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  seeds: [MainSeeder],
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: !!process.env.DB_SYNC,
};

export const options2: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: !!process.env.DB_SYNC,
};

export const dataSource = new DataSource(options);
