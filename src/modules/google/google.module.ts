import { Module } from '@nestjs/common';
import { GoogleService } from './google.service';
import { HttpModule } from '@nestjs/axios';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';

@Module({
	imports: [HttpModule, AccountModule, UserModule],
	providers: [GoogleService],
	exports: [GoogleService],
})
export class GoogleModule {}
