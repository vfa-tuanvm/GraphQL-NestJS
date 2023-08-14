import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Entity, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import User from './user.entity';

@ObjectType()
@Entity()
class Account {
	@Field(() => Int)
	@Column({ primary: true })
	public socialId: number;

	@Column({ primary: true })
	@Field()
	public type: string;

	@Column()
	@Field()
	public email: string;

	@CreateDateColumn()
	@Field()
	public createdAt: string;

	@ManyToOne(() => User, user => user.socialAccounts)
	user: User;
}

export default Account;
