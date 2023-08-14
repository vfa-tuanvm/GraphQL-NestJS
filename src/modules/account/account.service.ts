import { Injectable } from '@nestjs/common';

@Injectable()
export class AccountService {
	constructor() {} // private accountRepository: Repository<Account>, // @InjectRepository(Account)

	// async create(dto: CreateAccountDTO): Promise<string> {
	// 	const account = await this.accountRepository.findOneBy({
	// 		username: dto.username,
	// 	});

	// 	if (account) {
	// 		throw new GraphQLError('Username has been used.', {
	// 			extensions: {
	// 				code: CONFLICT,
	// 			},
	// 		});
	// 	}

	// 	const salt = await bcrypt.genSalt();
	// 	const hashPassword = await bcrypt.hash(dto.password, salt);

	// 	dto.password = hashPassword;

	// 	const newAccount = this.accountRepository.create(dto);
	// 	await this.accountRepository.save(newAccount);

	// 	return newAccount.username;
	// }

	// async findOne(username: string): Promise<Account> {
	// 	const account = await this.accountRepository.findOneBy({ username });

	// 	if (!account) {
	// 		throw new GraphQLError('Account not found.', {
	// 			extensions: {
	// 				code: NOT_FOUND,
	// 			},
	// 		});
	// 	}

	// 	return account;
	// }

	// async changePass(username: string, dto: ChangePassDTO) {
	// 	const account = await this.accountRepository.findOneBy({ username });

	// 	const isMatch = await bcrypt.compare(dto.oldPass, account.password);

	// 	if (!isMatch) {
	// 		throw new GraphQLError('Password not match', {
	// 			extensions: {
	// 				code: PASSWORD_NOT_MATCH,
	// 			},
	// 		});
	// 	}

	// 	const salt = await bcrypt.genSalt();
	// 	const hashPassword = await bcrypt.hash(dto.newPass, salt);

	// 	account.password = hashPassword;

	// 	await this.accountRepository.save(account);

	// 	return 'Change password success';
	// }
}
