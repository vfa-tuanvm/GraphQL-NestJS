import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignInDTO } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { PASSWORD_NOT_MATCH } from '../../constance/error-code';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async signJWTToken(username: string): Promise<string> {
    const secret: string = this.config.get('JWT_SECRET');
    const payload: IJWTInfo = {
      username,
    };

    let expiresIn = this.config.get('JWT_EXPIRATION');

    return this.jwtService.signAsync(payload, {
      expiresIn: expiresIn,
      secret,
    });
  }

  async signIn(dto: SignInDTO): Promise<string> {
    const account = await this.accountService.findOne(dto.username);

    const isMatch = await bcrypt.compare(dto.password, account.password);

    if (!isMatch) {
      throw new GraphQLError('Password not match', {
        extensions: {
          code: PASSWORD_NOT_MATCH,
        },
      });
    }

    return this.signJWTToken(dto.username);
  }
}
