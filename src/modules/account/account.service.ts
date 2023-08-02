import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Account from '../../entity/account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDTO } from './account.dto';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { CONFLICT } from '../../constance/error-code';

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
}
