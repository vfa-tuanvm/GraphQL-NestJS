import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './vendors/interceptors/logging.interceptor';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe());
	app.enableCors();
	app.use(
		'/graphql',
		graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 }),
	);
	const config = app.get(ConfigService);

	const API_SERVER = config.get<string>('API_SERVER');
	const PORT = config.get<string>('PORT');
	app.useGlobalInterceptors(new LoggingInterceptor());
	await app.listen(PORT);

	console.log('App is running');

	console.log(`[⚡Server] Server is running on: ${API_SERVER}`);
}
bootstrap();
