import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Account from '../../entity/account.entity';
import { AccountService } from './account.service';
import { UserModule } from '../user/user.module';
import { AccountResolver } from './account.resolver';

@Module({
	imports: [TypeOrmModule.forFeature([Account]), UserModule],
	providers: [AccountService, AccountResolver],
	exports: [AccountService],
})
export class AccountModule {}
