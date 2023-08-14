import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class SignInInput {
	@Field(() => String)
	@IsNotEmpty({ message: 'Email is required' })
	email: string;

	@Field(() => String)
	@IsNotEmpty({ message: 'Password is required' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password too weak',
	})
	password: string;
}
