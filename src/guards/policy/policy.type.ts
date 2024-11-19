import { ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export type PolicyFactoryType = (
  context: ExecutionContext,
  reflector: Reflector,
  logger: Logger,
) => any;

export type RequiredRulesType<A, S, F = string[]> = {
  action: A;
  subject: S;
  fileds?: F;
};
