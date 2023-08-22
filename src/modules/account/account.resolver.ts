import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
export class AccountResolver {
	constructor(private readonly accountService: AccountService) {}

	@UseGuards(JwtAuthGuard)
	@Mutation('disconnect')
	disconnect(@GqlUser() user: IJWTInfo, @Args('type') type: string) {
		return this.accountService.delete(user.userId, type);
	}
}
