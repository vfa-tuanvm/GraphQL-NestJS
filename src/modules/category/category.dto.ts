import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCategoryDTO {
  @Field()
  name: string;
}

@InputType()
export class UpdateCategoryDTO {
  @Field()
  name: string;
}
