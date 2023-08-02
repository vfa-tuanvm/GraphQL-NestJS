import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAccountDTO {
  @Field((type) => String)
  username: string;

  @Field((type) => String)
  password: string;
}
