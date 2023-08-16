import { Field, ObjectType } from '@nestjs/graphql';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	Unique,
	OneToMany,
} from 'typeorm';
import Account from './account.entity';

@ObjectType()
@Entity()
@Unique(['email'])
class User {
	@PrimaryGeneratedColumn('uuid')
	@Field()
	id: string;

	@Column({ nullable: true })
	@Field()
	fullName: string;

	@Column({ nullable: true })
	@Field()
	email: string;

	@Column({ nullable: true })
	@Field()
	password: string;

	@Column({ nullable: true })
	@Field()
	avatar: string;

	@OneToMany(() => Account, account => account.user)
	socialAccounts: Account[];
}

export default User;
