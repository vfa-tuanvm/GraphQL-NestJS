import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInInput, SignUpInput } from './auth.dto';
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

	@Query('signin')
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
}
