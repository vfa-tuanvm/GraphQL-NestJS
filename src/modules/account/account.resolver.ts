import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GqlUser } from '../../vendors/decorators/user.decorator';
import { ChangePassDTO } from './account.dto';

@Resolver()
@UseGuards(JwtAuthGuard)
export class AccountResolver {
  constructor(private readonly accountService: AccountService) {}

  @Mutation('changePass')
  async changePass(@GqlUser() user: IJWTInfo, @Args('dto') dto: ChangePassDTO) {
    // console.log('user: ', user);
    return this.accountService.changePass(user.username, dto);
  }
}
