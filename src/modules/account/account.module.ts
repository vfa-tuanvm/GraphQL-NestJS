import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Account from '../../entity/account.entity';

@Module({
	imports: [TypeOrmModule.forFeature([Account])],
})
export class AccountModule {}
