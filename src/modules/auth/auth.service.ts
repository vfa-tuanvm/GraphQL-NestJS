import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInInput, SignUpInput } from './auth.dto';
import { UserService } from '../user/user.service';
import { AuthResponse } from './auth.response';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { PASSWORD_NOT_MATCH, NOT_FOUND } from '../../constance/error-code';
import { FacebookService } from '../facebook/facebook.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly config: ConfigService,
		private readonly facebookService: FacebookService,
	) {}

	async signJWTToken(userId: string): Promise<string> {
		const secret: string = this.config.get('JWT_SECRET');
		const payload: IJWTInfo = {
			userId,
		};

		const expiresIn = this.config.get('JWT_EXPIRATION');

		return this.jwtService.signAsync(payload, {
			expiresIn: expiresIn,
			secret,
		});
	}

	async signJWTRefeshToken(userId: string): Promise<string> {
		const secret: string = this.config.get('JWT_REFRESH_SECRET');
		const payload: IJWTInfo = {
			userId,
		};

		const expiresIn = this.config.get('JWT_REFRESH_EXPIRATION');

		return this.jwtService.signAsync(payload, {
			expiresIn: expiresIn,
			secret,
		});
	}

	async createAuthToken(username: string) {
		const accessToken = await this.signJWTToken(username);
		const refreshToken = await this.signJWTRefeshToken(username);
		return { accessToken, refreshToken };
	}

	async signIn(input: SignInInput) {
		const user = await this.userService.findByEmail(input.email);

		if (!user) {
			throw new GraphQLError('User not found', {
				extensions: {
					code: NOT_FOUND,
					statusCode: HttpStatus.NOT_FOUND,
				},
			});
		}

		const isMatch = await bcrypt.compare(input.password, user.password);

		if (!isMatch) {
			throw new GraphQLError('Password not match', {
				extensions: {
					code: PASSWORD_NOT_MATCH,
					statusCode: HttpStatus.NOT_ACCEPTABLE,
				},
			});
		}

		const accessToken = await this.signJWTToken(user.email);
		const refreshToken = await this.signJWTRefeshToken(user.email);

		const result: AuthResponse = {
			email: user.email,
			accessToken,
			refreshToken,
		};

		result.fullName = user.fullName;
		result.avatar = user.avatar;

		return result;
	}

	async signUp(input: SignUpInput) {
		const user = await this.userService.create(input);

		const accessToken = await this.signJWTToken(user.email);
		const refreshToken = await this.signJWTRefeshToken(user.email);

		const result: AuthResponse = {
			email: user.email,
			fullName: user.fullName,
			accessToken,
			refreshToken,
		};

		return result;
	}

	async loginFacebook(code: string, redirectURL: string) {
		const loginResult = await this.facebookService.preLogin(
			code,
			redirectURL,
		);

		const accessToken = await this.signJWTToken(loginResult.id);
		const refreshToken = await this.signJWTRefeshToken(loginResult.id);

		const result: AuthResponse = {
			accessToken,
			refreshToken,
			fullName: loginResult.fullName,
			avatar: loginResult.avatar,
			email: loginResult.email,
		};

		return result;
	}
}
