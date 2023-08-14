/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class ChangePassDTO {
	oldPass: string;
	newPass: string;
}

export class SignInDTO {
	username: string;
	password: string;
}

export class SignupDTO {
	username: string;
	password: string;
}

export class PageInfo {
	totalCount: number;
	currentPage: number;
}

export abstract class IMutation {
	abstract changePass(
		dto?: Nullable<ChangePassDTO>,
	): Nullable<string> | Promise<Nullable<string>>;

	abstract signin(dto: SignInDTO): AuthResponse | Promise<AuthResponse>;

	abstract signup(dto: SignupDTO): string | Promise<string>;
}

export abstract class IQuery {
	abstract refreshToken():
		| Nullable<AuthResponse>
		| Promise<Nullable<AuthResponse>>;
}

export class AuthResponse {
	accessToken: string;
	refreshToken: string;
	username: string;
}

type Nullable<T> = T | null;
