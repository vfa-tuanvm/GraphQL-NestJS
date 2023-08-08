import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const ctx = GqlExecutionContext.create(context);
    const info = ctx.getInfo();
    return next.handle().pipe(
      tap(
        () => {
          new Logger(context.getClass().name).log(
            `${info.parentType} "${info.fieldName}" SUCCESS ---- ${
              Date.now() - now
            }ms`,
          );
        },
        (error: Error) => {
          new Logger().error({
            meta: `${info.parentType} "${info.fieldName}" ERROR ---- ${
              Date.now() - now
            }ms`,
            input: ctx.getArgs(),
            errorName: error.name,
            errorMessage: error.message,
            stack: error.stack,
          });
        },
      ),
    );
  }
}
