import { HttpException, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './modules/database/database.module';
import { AccountModule } from './modules/account/account.module';
import { CategoryModule } from './modules/category/category.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ProductModule } from './modules/product/product.module';
import { AuthModule } from './modules/auth/auth.module';
import { join } from 'path';
import * as path from 'path';

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
      formatError: (error) => {
        console.log('error: ', error);
        const graphQLFormattedError = {
          message:
            error.extensions?.exception?.response?.message ||
            error.extensions?.originalError?.message ||
            error.message,
          code: error.extensions?.code || 'SERVER_ERROR',
          name: error.extensions?.exception?.name || error.name,
        };
        return graphQLFormattedError;
      },
    }),
    AccountModule,
    CategoryModule,
    CloudinaryModule,
    ProductModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
