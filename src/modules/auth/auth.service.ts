import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInInput, SignUpInput } from './auth.dto';
import { UserService } from '../user/user.service';
import { AuthResponse, IConnect } from './auth.response';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import {
	PASSWORD_NOT_MATCH,
	NOT_FOUND,
	USER_HAS_CONNECTED_WITH_SOCIAL_ACCOUNT,
} from '../../constance/error-code';
import { FacebookService } from '../facebook/facebook.service';
import { GoogleService } from '../google/google.service';
import { AccountService } from '../account/account.service';
import { SocialType } from '../../constance/social-account';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly jwtService: JwtService,
		private readonly config: ConfigService,
		private readonly facebookService: FacebookService,
		private readonly googleService: GoogleService,
		private readonly accountService: AccountService,
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

		const accessToken = await this.signJWTToken(user.id);
		const refreshToken = await this.signJWTRefeshToken(user.id);

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

		const accessToken = await this.signJWTToken(user.id);
		const refreshToken = await this.signJWTRefeshToken(user.id);

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

	async loginGoogle(code: string) {
		const loginResult = await this.googleService.preLogin(code);

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

	async connectSocialAccount(
		code: string,
		type: string,
		userId: string,
		redirectURL?: string,
	) {
		const isConnected = await this.accountService.hasSocialAccount(
			type,
			userId,
		);

		if (isConnected) {
			throw new GraphQLError(
				`User has arealdy connected with ${type.toLowerCase()}`,
				{
					extensions: {
						code: USER_HAS_CONNECTED_WITH_SOCIAL_ACCOUNT,
						statusCode: HttpStatus.CONFLICT,
					},
				},
			);
		}

		let userInfSocial: IConnect;

		switch (type) {
			case SocialType.Facebook:
				userInfSocial = await this.facebookService.preConnect(
					code,
					redirectURL,
				);
				break;
			case SocialType.Google:
				userInfSocial = await this.googleService.preConnect(code);
				break;
			default:
				break;
		}

		const account = await this.accountService.findByIdAndType(
			userInfSocial.id,
			type,
		);

		if (account) {
			throw new GraphQLError(
				`This ${type.toLowerCase()} account has connected with another user`,
				{
					extensions: {
						code: '',
						statusCode: HttpStatus.NOT_ACCEPTABLE,
					},
				},
			);
		}

		const user = await this.userService.findById(userId);

		if (!user.avatar && userInfSocial.avatar) {
			this.userService.updateAvatar(user.id, userInfSocial.avatar);
		}

		await this.accountService.create({
			socialId: userInfSocial.id,
			type,
			user,
			email: userInfSocial.email,
		});

		return 'Connected';
	}
}
