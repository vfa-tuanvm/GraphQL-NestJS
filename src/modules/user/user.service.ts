import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from '../../entity/user.entity';
import { SignUpInput } from '../auth/auth.dto';
import { GraphQLError } from 'graphql';
import { CONFLICT, NOT_FOUND } from '../../constance/error-code';
import * as bcrypt from 'bcrypt';

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

		if (!user) {
			throw new GraphQLError('User not found', {
				extensions: {
					code: NOT_FOUND,
					statusCode: HttpStatus.NOT_FOUND,
				},
			});
		}

		return user;
	}
}
