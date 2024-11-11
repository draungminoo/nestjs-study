import { join } from 'path';
import { AppEnvValues } from 'src/resources/env/app.env';
import { DataSourceOptions } from 'typeorm';

export const secondaryDatabaseConfig: DataSourceOptions = {
  type: 'sqlite',
  database: join(AppEnvValues.DATABASE_DIR, 'secondary-database.sqlite'),

  entities: ['./dist/apps/secondary/**/*.entity.js'],

  // development purpose only
  // remove in production
  synchronize: true,

  enableWAL: true,
};
