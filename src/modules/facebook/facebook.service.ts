import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IFacebookToken, IFacebookUser } from './facebook.response';
import { GraphQLError } from 'graphql';
import {
	CAN_NOT_GET_FACEBOOK_TOKEN,
	CAN_NOT_GET_USER_FACEBOOK,
} from '../../constance/error-code';
import { UserService } from '../user/user.service';
import { AccountService } from '../account/account.service';
import { SocialType } from '../../constance/social-account';

@Injectable()
export class FacebookService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
		private readonly accountService: AccountService,
		private readonly userService: UserService,
	) {}

	async getToken(code: string, redirectURL: string) {
		try {
			const appId = this.configService.get<string>('FB_APP_ID');
			const appSecret = this.configService.get<string>('FB_APP_SECRET');

			const token = (
				await this.httpService.axiosRef.get<IFacebookToken>(
					`https://graph.facebook.com/v17.0/oauth/access_token?client_id=${appId}&redirect_uri=${encodeURIComponent(
						redirectURL,
					)}&client_secret=${appSecret}&code=${code}`,
				)
			).data;

			return token;
		} catch (error) {
			throw new GraphQLError('Can not get Facebook Token', {
				extensions: {
					code: CAN_NOT_GET_FACEBOOK_TOKEN,
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				},
			});
		}
	}

	async getUserInfo(accessToken: string) {
		try {
			const res = (
				await this.httpService.axiosRef.get<IFacebookUser>(
					`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture.width(640).height(640)`,
				)
			).data;

			return res;
		} catch (error) {
			throw new GraphQLError('Can not get user info from Facebook', {
				extensions: {
					code: CAN_NOT_GET_USER_FACEBOOK,
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				},
			});
		}
	}

	async preLogin(code: string, redirectURL: string) {
		const { access_token } = await this.getToken(code, redirectURL);

		const { id, email, name, picture } = await this.getUserInfo(
			access_token,
		);

		const account = await this.accountService.findByIdAndType(
			id,
			SocialType.Facebook,
		);

		if (account) {
			return account.user;
		}

		const user = await this.userService.createUserSocial(
			{
				email,
				fullName: name,
				avatar: picture.data.url,
			},
			SocialType.Facebook,
		);

		await this.accountService.create({
			socialId: id.toString(),
			type: SocialType.Facebook,
			email,
			user,
		});

		return user;
	}
}
