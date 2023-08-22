import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../../user/user.service';
import { GraphQLError } from 'graphql';
import { YOU_ARE_UNAUTHORIZE } from '../../../constance/error-code';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private userService: UserService,
		private configService: ConfigService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('JWT_SECRET'),
		});
	}

	async validate(payload: IJWTInfo) {
		const account = await this.userService.findById(payload.userId);

		if (!account) {
			throw new GraphQLError('You are unauthorized', {
				extensions: {
					code: YOU_ARE_UNAUTHORIZE,
					statusCode: HttpStatus.UNAUTHORIZED,
				},
			});
		}

		return payload;
	}
}
