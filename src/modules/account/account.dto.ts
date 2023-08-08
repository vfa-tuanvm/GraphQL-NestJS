import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class CreateAccountDTO {
  @Field((type) => String)
  @IsNotEmpty({ message: 'Username is required' })
  username: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

@InputType()
export class ChangePassDTO {
  @Field((type) => String)
  @IsNotEmpty({ message: 'Old pass is required' })
  oldPass: string;

  @Field((type) => String)
  @IsNotEmpty({ message: 'New pass is required' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  newPass: string;
}
