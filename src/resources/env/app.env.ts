import { join } from 'path';
import { cwd } from 'process';

const currentWorkingDir = cwd();

export const AppEnvValues = {
  DATABASE_DIR: join(currentWorkingDir, 'database'),
  REDIS_URL: 'redis://localhost:6379',
};
