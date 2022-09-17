import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  const dockerPort = process.env.DOCKER_PORT;
  const applicationPort = process.env.APPLICATION_PORT;
  await app.listen(dockerPort);
  Logger.log(
    `🔥 GraphQL Server running on http://localhost:${applicationPort}/graphql`,
    'NestBootstrap',
  );
}

bootstrap();
