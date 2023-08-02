import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './account.dto';
import Account from '../../entity/account.entity';

@Resolver((of) => Account)
export class AccountResolver {
  constructor(private accountService: AccountService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => String)
  async createAccount(@Args('dto') dto: CreateAccountDTO): Promise<string> {
    return this.accountService.create(dto);
  }
}
