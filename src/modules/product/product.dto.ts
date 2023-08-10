import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsUUID, Max, Min } from 'class-validator';

@InputType()
export class CreateProductDTO {
	@Field(() => String)
	@IsNotEmpty({ message: 'Name is required' })
	name: string;

	@Field(() => Number)
	@Max(1000, { message: 'Quantity must less than 1000' })
	@Min(0, { message: 'Quantity must greater than 0' })
	@IsNotEmpty()
	quantity: number;

	@Field(() => String)
	@IsNotEmpty({ message: 'Description is required' })
	description: string;

	@Field(() => String)
	@IsUUID()
	@IsNotEmpty({ message: 'Category Id is required' })
	categoryId: string;
}

@InputType()
export class UpdateProductDTO {
	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsNotEmpty()
	name?: string;

	@Field(() => Number, { nullable: true })
	@IsOptional()
	@Max(1000, { message: 'Quantity must less than 1000' })
	@Min(0, { message: 'Quantity must greater than 0' })
	quantity?: number;

	@Field(() => String, { nullable: true })
	description?: string;

	@Field(() => String, { nullable: true })
	@IsOptional()
	@IsUUID()
	categoryId?: string;
}
