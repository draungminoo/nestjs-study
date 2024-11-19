import {
  AbilityBuilder,
  createMongoAbility,
  fieldPatternMatcher,
} from '@casl/ability';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { methods } from './app.data';
import { AppModule } from './app.module';
import { SocketIoAdapter } from './services/global/socket-io/socket-io.adapter';

const port = 3000;

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // cors
  app.enableCors({
    origin: '*',
    methods: methods,
    credentials: true,
  });

  const redisAdapter = new SocketIoAdapter(app);
  redisAdapter.setLogger(logger);
  app.useWebSocketAdapter(redisAdapter);

  await app.listen(port, () => {
    console.log(`
    Server is running on port: ${port}
    Current Process ID: ${process.pid}
`);
  });
}
bootstrap();
