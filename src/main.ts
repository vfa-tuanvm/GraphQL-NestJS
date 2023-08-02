import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }),
  );
  const config = app.get(ConfigService);

  const API_SERVER = config.get<string>('API_SERVER');
  const PORT = config.get<string>('PORT');
  await app.listen(PORT);

  console.log(`[⚡Server] Server is running on: ${API_SERVER}`);
}
bootstrap();
