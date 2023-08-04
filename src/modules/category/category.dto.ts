import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCategoryDTO {
  @Field()
  @IsNotEmpty()
  name: string;
}

@InputType()
export class UpdateCategoryDTO {
  @Field()
  @IsNotEmpty()
  name: string;
}
