import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AssignReqGuard } from '../assign-req/assign-req.guard';
import { PolicyGuard } from '../policy/policy.guard';

@Injectable()
export class AppGuard implements CanActivate {
  private staticRoutes: string[] = ['/app', '/assets'];

  constructor(
    private assignReqGuard: AssignReqGuard,
    private policyGuard: PolicyGuard,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    if (this.staticRoutes.some((s) => req.path.startsWith(s))) {
      return true;
    }

    const reqAssigned = await this.assignReqGuard.canActivate(context);
    const isPolicyPassed = await this.policyGuard.canActivate(context);

    return reqAssigned && isPolicyPassed;
  }
}
