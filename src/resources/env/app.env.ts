import { config } from 'dotenv';
import { join } from 'path';
import { cwd } from 'process';

config({
  path: 'env/.env',
  override: true,
});

const currentWorkingDir = cwd();

export const AppEnvValues = {
  DATABASE_DIR: join(currentWorkingDir, 'database'),
  REDIS_URL: 'redis://localhost:6379',

  // env values
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,

  // token
  ACCESS_TOKEN_EXP_SECOND: 60 * 15,
  REFRESH_TOKEN_EXP_SECOND: 86_400 * 7,
};
