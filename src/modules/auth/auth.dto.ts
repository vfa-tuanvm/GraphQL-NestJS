import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class SignInDTO {
	@Field()
	@IsNotEmpty({ message: 'Username is required' })
	username: string;

	@Field()
	@IsNotEmpty({ message: 'Password is required' })
	password: string;
}

@InputType()
export class SignupDTO {
	@Field()
	@IsNotEmpty()
	username: string;

	@Field()
	@IsNotEmpty()
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password too weak',
	})
	password: string;
}
