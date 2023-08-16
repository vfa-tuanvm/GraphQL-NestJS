import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	IFacebookToken,
	IFacebookUser,
	IFacebookVerifyToken,
} from './facebook.response';
import { GraphQLError } from 'graphql';
import {
	CAN_NOT_GET_FACEBOOK_TOKEN,
	CAN_NOT_VERIFY_FACEBOOK_TOKEN,
} from '../../constance/error-code';

@Injectable()
export class FacebookService {
	constructor(
		private readonly httpService: HttpService,
		private readonly configService: ConfigService,
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

	async verifyToken(token: string) {
		try {
			const appToken = this.configService.get<string>('FB_APP_TOKEN');
			const appId = this.configService.get<string>('FB_APP_ID');

			const response = (
				await this.httpService.axiosRef.get<IFacebookVerifyToken>(
					`https://graph.facebook.com/debug_token?input_token=${token}&access_token=${appToken}`,
				)
			).data;

			const { is_valid, app_id } = response.data;

			if (is_valid && app_id === appId) {
				return true;
			}

			return false;
		} catch (error) {
			throw new GraphQLError('Can not verify facebook token', {
				extensions: {
					code: CAN_NOT_VERIFY_FACEBOOK_TOKEN,
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				},
			});
		}
	}

	async getUserInfo(accessToken: string) {
		const res = (
			await this.httpService.axiosRef.get<IFacebookUser>(
				`https://graph.facebook.com/me?access_token=${accessToken}&fields=id,name,email,picture.width(640).height(640)`,
			)
		).data;

		return res;
	}
}
