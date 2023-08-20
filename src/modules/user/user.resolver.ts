import { Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Resolver()
export class UserResolver {
	constructor(private readonly userService: UserService) {}

	@UseGuards(JwtAuthGuard)
	@Query('getAccountsLinked')
	getAccountsLinked(@GqlUser() user: IJWTInfo) {
		return this.userService.getAccountsLinked(user.userId);
	}

	@UseGuards(JwtAuthGuard)
	@Query('getUserInfo')
	async getUserInfo(@GqlUser() user: IJWTInfo) {
		const userInfo = await this.userService.findById(user.userId);

		return {
			fullName: userInfo.fullName,
			avatar: userInfo.avatar,
			email: userInfo.email,
		};
	}
}
