import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '../account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [AccountModule, JwtModule],
  providers: [AuthService, JwtStrategy, AuthResolver],
})
export class AuthModule {}
