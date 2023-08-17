import User from '../../entity/user.entity';

export class CreateAccountDTO {
	socialId: string;
	type: string;
	email?: string;
	user: User;
}
