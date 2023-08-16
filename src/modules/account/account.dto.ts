import User from '../../entity/user.entity';

export class CreateAccountDTO {
	sociaId: string;
	type: string;
	email?: string;
	user: User;
}
