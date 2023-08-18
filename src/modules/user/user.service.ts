import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../../entity/user.entity';
import { SignUpInput } from '../auth/auth.dto';
import { GraphQLError } from 'graphql';
import { CONFLICT } from '../../constance/error-code';
import * as bcrypt from 'bcrypt';
import { CreatUserSocialDTO } from './user.dto';
import { SocialType } from '../../constance/social-account';
import { AccountResponse } from '../account/account.response';

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async create(input: SignUpInput) {
		const user = await this.userRepository.findOneBy({
			email: input.email,
		});

		if (user) {
			throw new GraphQLError('Email has been used', {
				extensions: {
					code: CONFLICT,
					statusCode: HttpStatus.CONFLICT,
				},
			});
		}

		const salt = await bcrypt.genSalt();
		const hashPassword = await bcrypt.hash(input.password, salt);

		input.password = hashPassword;

		const newUser = this.userRepository.create(input);

		return this.userRepository.save(newUser);
	}

	async findByEmail(email: string) {
		const user = await this.userRepository.findOneBy({ email });

		return user;
	}

	async createUserSocial(dto: CreatUserSocialDTO, type: SocialType) {
		let usingEmailWhenCreate = false;

		if (dto.email) {
			const existedUser = await this.userRepository.findOne({
				where: { email: dto.email },
				relations: {
					socialAccounts: true,
				},
			});

			if (existedUser) {
				if (
					!existedUser.socialAccounts.some(acc => acc.type === type)
				) {
					if (!existedUser.avatar && dto.avatar) {
						await this.userRepository.update(
							{ id: existedUser.id },
							{ avatar: dto.avatar },
						);
					}
					return existedUser;
				}

				usingEmailWhenCreate = false;
			} else {
				usingEmailWhenCreate = true;
			}
		}

		const user = this.userRepository.create({
			email: usingEmailWhenCreate ? dto.email : null,
			fullName: dto.fullName,
			avatar: dto.avatar,
		});
		const newUser = await this.userRepository.save(user);

		return newUser;
	}

	findById(id: string) {
		const user = this.userRepository.findOneBy({ id });
		return user;
	}

	async getAccountsLinked(id: string) {
		console.log('id: ', id);
		const user = await this.userRepository.findOne({
			where: { id },
			relations: { socialAccounts: true },
		});

		const accounts = user.socialAccounts
			.filter(acc => acc.deletedAt === null)
			.map(
				acc =>
					({
						socialId: acc.socialId,
						type: acc.type,
					}) as AccountResponse,
			);

		return accounts;
	}
}
