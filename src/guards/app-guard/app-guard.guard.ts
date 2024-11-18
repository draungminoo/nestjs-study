import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { AssignReqGuard } from '../assign-req/assign-req.guard';
import { PolicyGuard } from '../policy/policy.guard';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private assignReqGuard: AssignReqGuard,
    private policyGuard: PolicyGuard,
  ) {}

  async canActivate(context: ExecutionContext) {
    const req: Request = context.switchToHttp().getRequest();

    const reqAssigned = await this.assignReqGuard.canActivate(context);
    const isPolicyPassed = await this.policyGuard.canActivate(context);

    return reqAssigned && isPolicyPassed;
  }
}
