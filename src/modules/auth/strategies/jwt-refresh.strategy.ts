import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
	Strategy,
	'jwt-refresh-token',
) {
	constructor(
		private configService: ConfigService, // private accountService: AccountService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
			passReqToCallback: true,
			ignoreExpiration: false,
		});
	}

	async validate(req: Request, payload: IJWTInfo) {
		// const account = await this.accountService.findOne(payload.username);

		// if (!account) {
		// 	throw new UnauthorizedException();
		// }

		return payload;
	}
}
