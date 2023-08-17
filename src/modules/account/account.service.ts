import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Account from '../../entity/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDTO } from './account.dto';
@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
	) {}

	async create(dto: CreateAccountDTO) {
		const account = this.accountRepository.create(dto);

		await this.accountRepository.save(account);
	}

	async findByIdAndType(socialId: string, type: string) {
		const account = await this.accountRepository.findOne({
			where: {
				socialId,
				type,
			},
			relations: { user: true },
		});

		return account;
	}
}
