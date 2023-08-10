import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class CreateAccountDTO {
	/* eslint-disable  @typescript-eslint/no-unused-vars */
	@Field(type => String)
	@IsNotEmpty({ message: 'Username is required' })
	username: string;

	/* eslint-disable  @typescript-eslint/no-unused-vars */
	@Field(type => String)
	@IsNotEmpty({ message: 'Password is required' })
	password: string;
}

@InputType()
export class ChangePassDTO {
	/* eslint-disable  @typescript-eslint/no-unused-vars */
	@Field(type => String)
	@IsNotEmpty({ message: 'Old pass is required' })
	oldPass: string;

	/* eslint-disable  @typescript-eslint/no-unused-vars */
	@Field(type => String)
	@IsNotEmpty({ message: 'New pass is required' })
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: 'password too weak',
	})
	newPass: string;
}
