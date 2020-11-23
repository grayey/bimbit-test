import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import { StaticProps } from './static.props';

@Injectable()
export class AuthFieldInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    const req = context.switchToHttp().getRequest().body;
    const usernameField = req.username ? 'username' : 'email';
    //  StaticProps.usernameField = usernameField;
    // console.log('BeforeXX...', req, StaticProps.usernameField);

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
