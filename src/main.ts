import { NestFactory } from '@nestjs/core';
import { methods } from './app.data';
import { AppModule } from './app.module';

const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cors
  app.enableCors({
    origin: '*',
    methods: methods,
    credentials: true,
  });

  await app.listen(port, () => {
    console.log(`
    Server is running on port: ${port}
`);
  });
}
bootstrap();
