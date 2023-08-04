import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Account from '../../entity/account.entity';
import { Repository } from 'typeorm';
import { ChangePassDTO, CreateAccountDTO } from './account.dto';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import {
  CONFLICT,
  NOT_FOUND,
  PASSWORD_NOT_MATCH,
} from '../../constance/error-code';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account) private accountRepository: Repository<Account>,
  ) {}

  async create(dto: CreateAccountDTO): Promise<string> {
    const account = await this.accountRepository.findOneBy({
      username: dto.username,
    });

    if (account) {
      throw new GraphQLError('Username has been used.', {
        extensions: {
          code: CONFLICT,
        },
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.password, salt);

    dto.password = hashPassword;

    const newAccount = this.accountRepository.create(dto);
    await this.accountRepository.save(newAccount);

    return newAccount.username;
  }

  async findOne(username: string): Promise<Account> {
    const account = await this.accountRepository.findOneBy({ username });

    if (!account) {
      throw new GraphQLError('Account not found.', {
        extensions: {
          code: NOT_FOUND,
        },
      });
    }

    return account;
  }

  async changePass(username: string, dto: ChangePassDTO) {
    const account = await this.accountRepository.findOneBy({ username });

    const isMatch = await bcrypt.compare(dto.oldPass, account.password);

    if (!isMatch) {
      throw new GraphQLError('Password not match', {
        extensions: {
          code: PASSWORD_NOT_MATCH,
        },
      });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(dto.newPass, salt);

    account.password = hashPassword;

    await this.accountRepository.save(account);

    return 'Change password success';
  }
}
