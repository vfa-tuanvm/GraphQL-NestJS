import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInDTO, SignupDTO } from './auth.dto';
import { AccountService } from '../account/account.service';

@Resolver()
export class AuthResolver {
  constructor(
    private authService: AuthService,
    private accountService: AccountService,
  ) {}

  @Mutation('signin')
  async signin(@Args('dto', { type: () => SignInDTO }) dto: SignInDTO) {
    return this.authService.signIn(dto);
  }

  @Mutation('signup')
  async signup(@Args('dto', { type: () => SignupDTO }) dto: SignupDTO) {
    return this.accountService.create(dto);
  }
}
