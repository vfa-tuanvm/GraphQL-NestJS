import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh-token') {
	constructor(private jwtService: JwtService) {
		super();
	}

	canActivate(context: ExecutionContext) {
		return super.canActivate(context);
	}

	public getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context);
		return ctx.getContext().req;
	}
}
