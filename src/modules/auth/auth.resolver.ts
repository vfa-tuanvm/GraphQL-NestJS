import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInDTO, SignupDTO } from './auth.dto';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtRefreshGuard } from './jwt-refresh-auth.guard';

@Resolver()
export class AuthResolver {
	constructor(
		private authService: AuthService, // private accountService: AccountService,
	) {}

	@UseGuards(JwtRefreshGuard)
	@Query('refreshToken')
	async refreshToken(@GqlUser() user: IJWTInfo) {
		return this.authService.createAuthToken(user.username);
	}

	@Mutation('signin')
	async signin(@Args('dto', { type: () => SignInDTO }) dto: SignInDTO) {
		console.log('dto: ', dto);
		// return this.authService.signIn(dto);
		throw new Error('sldkfjsdf');
	}

	@Mutation('signup')
	async signup(@Args('dto', { type: () => SignupDTO }) dto: SignupDTO) {
		console.log('dto: ', dto);
		// return this.accountService.create(dto);
		throw new Error('sldkfjsdf');
	}
}
