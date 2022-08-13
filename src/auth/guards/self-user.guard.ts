import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';

@Injectable()
export class SelfUserGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;
    const query = String(ctx.getContext().req.body.query);
    const startIdField = query.indexOf('id');
    const startOfIdValue = query.indexOf('"', startIdField);
    const finishOfIdValue = query.indexOf('"', startOfIdValue + 1);
    const id = query.slice(startOfIdValue + 1, finishOfIdValue);
    if (!user || !id) return false;
    if (user.isAdmin()) return true;
    return String(user.id) === id;
  }
}
