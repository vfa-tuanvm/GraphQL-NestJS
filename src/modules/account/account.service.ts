import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Account from '../../entity/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDTO } from './account.dto';
import { UserService } from '../user/user.service';
@Injectable()
export class AccountService {
	constructor(
		@InjectRepository(Account)
		private readonly accountRepository: Repository<Account>,
		private readonly userService: UserService,
	) {}

	async create(dto: CreateAccountDTO) {
		const existedAccount = await this.accountRepository.findOne({
			where: {
				socialId: dto.socialId,
				type: dto.type,
			},
			withDeleted: true,
		});

		if (existedAccount && existedAccount.deletedAt) {
			await this.accountRepository.restore({
				socialId: dto.socialId,
				type: dto.type,
			});

			await this.accountRepository.update(
				{
					socialId: dto.socialId,
					type: dto.type,
				},
				{
					user: dto.user,
				},
			);

			return existedAccount;
		}

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
			withDeleted: false,
		});

		return account;
	}

	async delete(userId: string, type: string) {
		const user = await this.userService.findById(userId);

		await this.accountRepository.softDelete({ type, user });

		return type;
	}

	async hasSocialAccount(type: string, userId: string) {
		const user = await this.userService.findById(userId);

		const account = await this.accountRepository.findOneBy({ type, user });

		if (!account) {
			return false;
		}

		return true;
	}
}
