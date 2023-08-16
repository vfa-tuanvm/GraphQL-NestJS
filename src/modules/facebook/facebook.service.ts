import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IFacebookToken } from './response.type';
import { GraphQLError } from 'graphql';
import { ERROR_GET_FACEBOOK_TOKEN } from '../../constance/error-code';

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
					code: ERROR_GET_FACEBOOK_TOKEN,
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				},
			});
		}
	}
}
