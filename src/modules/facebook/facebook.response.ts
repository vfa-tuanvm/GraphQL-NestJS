export interface IFacebookToken {
	access_token: string;
	token_type: string;
	expires_in: string;
}

export interface IFacebookVerifyToken {
	data: {
		app_id: string;
		type: string;
		application: string;
		expires_at: number;
		is_valid: boolean;
		issued_at: number;
		metadata: {
			sso: string;
		};
		scopes: string[];
		user_id: string;
	};
}

export interface IFacebookUser {
	id: string;
	name: string;
	email: string;
	picture: {
		data: {
			height: number;
			is_silhouette: boolean;
			url: string;
			width: number;
		};
	};
}
