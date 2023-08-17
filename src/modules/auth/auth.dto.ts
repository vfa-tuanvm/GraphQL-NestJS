import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class SignInInput {
	@Field()
	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail()
	email: string;

	@Field()
	@IsNotEmpty({ message: 'Password is required' })
	password: string;
}

@InputType()
export class SignUpInput {
	@Field()
	@IsNotEmpty({ message: 'Email is required' })
	@IsEmail()
	email: string;

	@Field()
	@IsNotEmpty({ message: 'Full name is required' })
	fullName: string;

	@Field()
	@IsNotEmpty({ message: 'Password is required' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password too weak',
	})
	password: string;
}

@InputType()
export class loginFacebook {
	@Field()
	@IsNotEmpty()
	code: string;

	@Field()
	@IsNotEmpty()
	redirectURL: string;
}
