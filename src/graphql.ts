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

export class LinkSocialAccount {
	code: string;
	redirectURL?: Nullable<string>;
	type: string;
}

export class PageInfo {
	totalCount: number;
	currentPage: number;
}

export abstract class IMutation {
	abstract disconnect(type: string): string | Promise<string>;

	abstract signin(input: SignInInput): AuthResponse | Promise<AuthResponse>;

	abstract signup(input: SignUpInput): AuthResponse | Promise<AuthResponse>;

	abstract loginFacebook(
		input: LoginFacebookInput,
	): AuthResponse | Promise<AuthResponse>;

	abstract loginGoogle(input: string): AuthResponse | Promise<AuthResponse>;

	abstract linkSocialAccount(
		input: LinkSocialAccount,
	): string | Promise<string>;
}

export abstract class IQuery {
	abstract refreshToken():
		| Nullable<AuthResponse>
		| Promise<Nullable<AuthResponse>>;

	abstract getAccountsLinked():
		| Nullable<AccountResponse>[]
		| Promise<Nullable<AccountResponse>[]>;

	abstract getUserInfo(): UserInfo | Promise<UserInfo>;
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

export class UserInfo {
	fullName?: Nullable<string>;
	avatar?: Nullable<string>;
	email?: Nullable<string>;
}

type Nullable<T> = T | null;
