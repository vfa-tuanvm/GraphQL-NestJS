import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthResolver } from './auth.resolver';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { UserModule } from '../user/user.module';
import { FacebookModule } from '../facebook/facebook.module';
import { GoogleModule } from '../google/google.module';

@Module({
	imports: [JwtModule, UserModule, FacebookModule, GoogleModule],
	providers: [AuthService, JwtStrategy, JwtRefreshStrategy, AuthResolver],
})
export class AuthModule {}
