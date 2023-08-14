import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';

@Module({
	// imports: [TypeOrmModule.forFeature([Account])],
	providers: [AccountService, AccountResolver],
	exports: [AccountService],
})
export class AccountModule {}
