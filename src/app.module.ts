import { HttpStatus, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from './modules/database/database.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `env/.env.${process.env.NODE_ENV || 'local'}`,
			validationSchema: Joi.object({
				NODE_ENV: Joi.string()
					.valid('local', 'development', 'production')
					.default('local'),
			}),
		}),
		DatabaseModule,
		GraphQLModule.forRoot({
			driver: ApolloDriver,
			// autoSchemaFile: 'schema.gql',
			typePaths: ['src/common/*.graphql', 'src/modules/**/*.graphql'],
			definitions: {
				path: join(process.cwd(), 'src/graphql.ts'),
				outputAs: 'class',
			},
			context: ({ req, res }) => ({ req, res }),
			formatError: error => {
				console.log('error: ', error);
				const graphQLFormattedError = {
					message:
						error.extensions?.exception?.response?.message ||
						error.extensions?.originalError?.message ||
						error.message,
					code: error.extensions?.code || 'SERVER_ERROR',
					name: error.extensions?.exception?.name || error.name,
					statusCode:
						error.extensions?.exception?.response?.message ||
						HttpStatus.BAD_REQUEST,
				};
				return graphQLFormattedError;
			},
		}),
		CloudinaryModule,
		AccountModule,
		AuthModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
