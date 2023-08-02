import { Field, InputType } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';

@InputType()
export class CreateProductDTO {
  @Field(() => String)
  name: string;

  @Field(() => Number)
  quantity: number;

  @Field(() => String)
  description: string;

  @Field(() => String)
  categoryId: string;

  @Field(() => GraphQLUpload)
  image: Upload;
}

@InputType()
export class UpdateProductDTO {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => Number, { nullable: true })
  quantity?: number;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  categoryId?: string;

  @Field(() => GraphQLUpload, { nullable: true })
  image?: Upload;
}
