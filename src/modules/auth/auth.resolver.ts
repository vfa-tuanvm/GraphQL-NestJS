import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput, loginFacebook } from './auth.dto';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtRefreshGuard } from './jwt-refresh-auth.guard';

@Resolver()
export class AuthResolver {
	constructor(private authService: AuthService) {}

	@UseGuards(JwtRefreshGuard)
	@Query('refreshToken')
	async refreshToken(@GqlUser() user: IJWTInfo) {
		return this.authService.createAuthToken(user.userId);
	}

	@Mutation('signin')
	async signin(
		@Args('input', { type: () => SignInInput }) input: SignInInput,
	) {
		return this.authService.signIn(input);
	}

	@Mutation('signup')
	async signup(
		@Args('input', { type: () => SignUpInput }) input: SignUpInput,
	) {
		return this.authService.signUp(input);
	}

	@Mutation('loginFacebook')
	async loginFacebook(
		@Args('input', { type: () => loginFacebook }) input: loginFacebook,
	) {
		return this.authService.loginFacebook(input.code, input.redirectURL);
	}

	@Mutation('loginGoogle')
	async loginGoogle(@Args('input') code: string) {
		return this.authService.loginGoogle(code);
	}
}
