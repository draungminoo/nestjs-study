import {
  createParamDecorator,
  ExecutionContext,
  SetMetadata,
} from '@nestjs/common';
import { PolicyFactoryType, RequiredRulesType } from '../policy.type';

export const IS_PUBLIC_KEY = 'IS_PUBLIC_KEY';
export const ARE_PUBLIC_KEY = 'ARE_PUBLIC_KEY';

export const IS_ONLY_FOR_ADMIN = 'IS_ONLY_FOR_ADMIN';
export const ARE_ONLY_FOR_ADMIN = 'ARE_ONLY_FOR_ADMIN';

export const CurrentUser = createParamDecorator(
  (key: any, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return key ? req.user?.[key] : req.user;
  },
);

export const IsPublic = () => SetMetadata<string, boolean>(IS_PUBLIC_KEY, true);
export const ArePublic = () =>
  SetMetadata<string, boolean>(ARE_PUBLIC_KEY, true);

export const IsOnlyForAdmin = () =>
  SetMetadata<string, boolean>(IS_ONLY_FOR_ADMIN, true);
export const AreOnlyForAdmin = () =>
  SetMetadata<string, boolean>(ARE_ONLY_FOR_ADMIN, true);

// register external policy
export const EXTERNAL_POLICY_FACTORY = 'EXTERNAL_POLICY_FACTORY';
export const REQUIRED_RULE = 'REQUIRED_RULE';

export const RegisterExternalPolicy = (policyFactory: PolicyFactoryType) =>
  SetMetadata(EXTERNAL_POLICY_FACTORY, policyFactory);
export const RegisterRule = <A, S, F = string[]>(
  ...requiredRules: RequiredRulesType<A, S, F>[]
) => SetMetadata(REQUIRED_RULE, requiredRules);
