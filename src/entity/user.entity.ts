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
	public id: string;

	@Column()
	@Field()
	public fullName: string;

	@Column()
	@Field()
	public email: string;

	@Column()
	@Field()
	public password: string;

	@Column()
	@Field()
	public avatar: string;

	@OneToMany(() => Account, account => account.user)
	socialAccounts: Account[];
}

export default User;
