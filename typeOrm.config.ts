import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({ path: 'env/.env.local' });
const configService = new ConfigService();

export const dataSourceOption: DataSourceOptions = {
  type: 'mysql',
  database: configService.get('MYSQL_DB'),
  host: configService.get('MYSQL_HOST'),
  port: configService.get('MYSQL_PORT'),
  username: configService.get('MYSQL_USER'),
  password: configService.get('MYSQL_PASSWORD'),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
};

const datasource = new DataSource(dataSourceOption);
export default datasource;
