export class AuthResponse {
	accessToken: string;
	refreshToken: string;
	email?: string;
	fullName?: string;
	avatar?: string;
}

export class IConnect {
	id: string;
	email?: string;
	avatar?: string;
}
