import { Field, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import Product from './product.entity';

@ObjectType()
@Entity()
class Category {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	public id: string;

	@Column({ length: 100 })
	@Field()
	public name: string;

	@OneToMany(() => Product, product => product.category)
	/* eslint-disable  @typescript-eslint/no-unused-vars */
	@Field(type => [Product])
	products: Product[];
}

export default Category;
