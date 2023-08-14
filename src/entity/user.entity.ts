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

	@Column({ nullable: true })
	@Field()
	public fullName: string;

	@Column({ nullable: true })
	@Field()
	public email: string;

	@Column({ nullable: true })
	@Field()
	public password: string;

	@Column({ nullable: true })
	@Field()
	public avatar: string;

	@OneToMany(() => Account, account => account.user)
	socialAccounts: Account[];
}

export default User;
