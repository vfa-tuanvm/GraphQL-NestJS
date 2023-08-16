import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInInput, SignUpInput } from './auth.dto';
import { UserService } from '../user/user.service';
import { AuthResponse } from './auth.response';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { CODE_NOT_VALID, PASSWORD_NOT_MATCH } from '../../constance/error-code';
import { AccountService } from '../account/account.service';
import { FacebookService } from '../facebook/facebook.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly config: ConfigService,
		private readonly accountService: AccountService,
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
		const valid = await this.facebookService.verifyToken(code);

		if (!valid) {
			throw new GraphQLError('Can not login with Facebook', {
				extensions: {
					code: CODE_NOT_VALID,
					statusCode: HttpStatus.NOT_ACCEPTABLE,
				},
			});
		}

		const { access_token } = await this.facebookService.getToken(
			code,
			redirectURL,
		);
		console.log('access_token: ', access_token);

		// const userInfo = await this.facebookService.getUserInfo(access_token);
	}
}
