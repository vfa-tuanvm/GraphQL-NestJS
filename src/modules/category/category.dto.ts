import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateCategoryDTO {
	@Field()
	@IsNotEmpty({ message: 'Name is required' })
	name: string;
}

@InputType()
export class UpdateCategoryDTO {
	@Field()
	@IsNotEmpty({ message: 'Name is required' })
	name: string;
}
