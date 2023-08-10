import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@ObjectType()
@Entity()
@Unique(['username'])
class Account {
	@PrimaryGeneratedColumn('increment')
	/* eslint-disable  @typescript-eslint/no-unused-vars */
	@Field(type => Int)
	public id: number;

	@Column({ length: 20 })
	@Field()
	public username: string;

	@Column()
	@Field()
	public password: string;
}

export default Account;
