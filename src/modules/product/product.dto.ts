import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID, Max, Min } from 'class-validator';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';

@InputType()
export class CreateProductDTO {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => Number)
  @Max(1000)
  @Min(0)
  @IsNotEmpty()
  quantity: number;

  @Field(() => String)
  description: string;

  @Field(() => String)
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}

@InputType()
export class UpdateProductDTO {
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @Max(1000)
  @Min(0)
  quantity?: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
