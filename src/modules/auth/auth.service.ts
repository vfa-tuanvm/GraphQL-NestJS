import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
	constructor(
		// private readonly accountService: AccountService,
		private readonly jwtService: JwtService,
		private readonly config: ConfigService,
	) {}

	async signJWTToken(username: string): Promise<string> {
		const secret: string = this.config.get('JWT_SECRET');
		const payload: IJWTInfo = {
			username,
		};

		const expiresIn = this.config.get('JWT_EXPIRATION');

		return this.jwtService.signAsync(payload, {
			expiresIn: expiresIn,
			secret,
		});
	}

	async signJWTRefeshToken(username: string): Promise<string> {
		const secret: string = this.config.get('JWT_REFRESH_SECRET');
		const payload: IJWTInfo = {
			username,
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

	// async signIn(dto: SignInDTO) {
	// 	const account = await this.accountService.findOne(dto.username);

	// 	const isMatch = await bcrypt.compare(dto.password, account.password);

	// 	if (!isMatch) {
	// 		throw new GraphQLError('Password not match', {
	// 			extensions: {
	// 				code: PASSWORD_NOT_MATCH,
	// 			},
	// 		});
	// 	}

	// 	return {
	// 		...(await this.createAuthToken(dto.username)),
	// 		username: dto.username,
	// 	};
	// }
}
