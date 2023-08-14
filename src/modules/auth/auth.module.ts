import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccountModule } from '../account/account.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UserModule } from '../user/user.module';

@Module({
	imports: [AccountModule, JwtModule, UserModule],
	providers: [AuthService, JwtStrategy, JwtRefreshStrategy, AuthResolver],
})
export class AuthModule {}
