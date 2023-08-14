import { Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GqlUser } from '../../vendors/decorators/user.decorator';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@Mutation('changePass')
	async changePass(
		@GqlUser() user: IJWTInfo,
		// @Args('dto') dto: ChangePassDTO,
	) {
		console.log('user: ', user);
		throw new Error('sdlkjsd');
		// return this.accountService.changePass(user.username, dto);
	}
}
