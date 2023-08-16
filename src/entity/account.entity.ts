import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import User from './user.entity';

@ObjectType()
@Entity()
class Account {
	@Field(() => Int)
	@Column({ primary: true })
	socialId: number;

	@Column({ primary: true })
	@Field()
	type: string;

	@Column({ nullable: true })
	@Field()
	email: string;

	@CreateDateColumn()
	@Field()
	createdAt: string;

	@ManyToOne(() => User, user => user.socialAccounts)
	user: User;
}

export default Account;
