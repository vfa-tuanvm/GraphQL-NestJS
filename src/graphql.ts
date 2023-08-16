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

export class PageInfo {
	totalCount: number;
	currentPage: number;
}

export abstract class IQuery {
	abstract refreshToken():
		| Nullable<AuthResponse>
		| Promise<Nullable<AuthResponse>>;
}

export abstract class IMutation {
	abstract signin(input: SignInInput): AuthResponse | Promise<AuthResponse>;

	abstract signup(input: SignUpInput): AuthResponse | Promise<AuthResponse>;
}

export class AuthResponse {
	email?: Nullable<string>;
	fullName?: Nullable<string>;
	avatar?: Nullable<string>;
	accessToken: string;
	refreshToken: string;
}

type Nullable<T> = T | null;
