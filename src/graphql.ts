/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignInInput {
	email: string;
	password: string;
}

export class SignUpInput {
	email: string;
	fullName: string;
	password: string;
}

export class LoginFacebookInput {
	code: string;
	redirectURL: string;
}

export class PageInfo {
	totalCount: number;
	currentPage: number;
}

export abstract class IQuery {
	abstract refreshToken():
		| Nullable<AuthResponse>
		| Promise<Nullable<AuthResponse>>;

	abstract getAccountsLinked():
		| Nullable<AccountResponse>[]
		| Promise<Nullable<AccountResponse>[]>;
}

export abstract class IMutation {
	abstract signin(input: SignInInput): AuthResponse | Promise<AuthResponse>;

	abstract signup(input: SignUpInput): AuthResponse | Promise<AuthResponse>;

	abstract loginFacebook(
		input: LoginFacebookInput,
	): AuthResponse | Promise<AuthResponse>;

	abstract loginGoogle(input: string): AuthResponse | Promise<AuthResponse>;
}

export class AuthResponse {
	email?: Nullable<string>;
	fullName?: Nullable<string>;
	avatar?: Nullable<string>;
	accessToken: string;
	refreshToken: string;
}

export class AccountResponse {
	socialId: string;
	type: string;
}

type Nullable<T> = T | null;
