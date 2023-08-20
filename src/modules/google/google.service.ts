import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { IGoogleToken, IGoogleUser } from './google.response';
import { GraphQLError } from 'graphql';
import { CAN_NOT_GET_GOOGLE_TOKEN } from '../../constance/error-code';
import { AccountService } from '../account/account.service';
import { SocialType } from '../../constance/social-account';
import { UserService } from '../user/user.service';

@Injectable()
export class GoogleService {
	constructor(
		private readonly httpService: HttpService,
		private readonly config: ConfigService,
		private readonly accountService: AccountService,
		private readonly userService: UserService,
	) {}

	async getToken(code: string) {
		try {
			const rootURl = 'https://oauth2.googleapis.com/token';

			const options = {
				code,
				client_id: this.config.get<string>('GOOGLE_OAUTH_CLIENT_ID'),
				client_secret: this.config.get<string>(
					'GOOGLE_OAUTH_CLIENT_SECRET',
				),
				redirect_uri: this.config.get<string>(
					'GOOGLE_OAUTH_REDIRECT_URL',
				),
				grant_type: 'authorization_code',
			};

			const { data } = await this.httpService.axiosRef.post<IGoogleToken>(
				rootURl,
				options,
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				},
			);

			return data;
		} catch (error) {
			throw new GraphQLError('Can not get Google Token', {
				extensions: {
					code: CAN_NOT_GET_GOOGLE_TOKEN,
					statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
				},
			});
		}
	}

	async getUserInfo(idToken: string, accessToken: string) {
		try {
			const { data } = await this.httpService.axiosRef.get<IGoogleUser>(
				`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`,
				{
					headers: {
						Authorization: `Bearer ${idToken}`,
					},
				},
			);

			return data;
		} catch (error) {
			console.log('error: ', error);
		}
	}

	async preLogin(code: string) {
		const { access_token, id_token } = await this.getToken(code);

		const userInfo = await this.getUserInfo(id_token, access_token);

		const account = await this.accountService.findByIdAndType(
			userInfo.id,
			SocialType.Google,
		);

		if (account) {
			return account.user;
		}

		const user = await this.userService.createUserSocial(
			{
				avatar: userInfo.picture,
				email: userInfo.email,
				fullName: userInfo.name,
			},
			SocialType.Google,
		);

		await this.accountService.create({
			socialId: userInfo.id,
			type: SocialType.Google,
			user,
			email: user.email,
		});

		return user;
	}

	async preConnect(code: string) {
		const { access_token, id_token } = await this.getToken(code);

		const { email, id, picture } = await this.getUserInfo(
			id_token,
			access_token,
		);

		return { id, email, avatar: picture };
	}
}
