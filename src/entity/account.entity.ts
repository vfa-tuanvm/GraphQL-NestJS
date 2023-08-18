import { Field, ObjectType } from '@nestjs/graphql';
import {
	Entity,
	Column,
	CreateDateColumn,
	ManyToOne,
	DeleteDateColumn,
} from 'typeorm';
import User from './user.entity';

@ObjectType()
@Entity()
class Account {
	@Field()
	@Column({ primary: true })
	socialId: string;

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

	@DeleteDateColumn({ nullable: true })
	@Field()
	deletedAt: string;
}

export default Account;
