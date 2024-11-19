import {
  AbilityBuilder,
  AbilityClass,
  InferSubjects,
  PureAbility,
} from '@casl/ability';
import { ExecutionContext, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { CaslActionsEnum } from 'src/resources/enums/casl-actions.enum';
import { Bed } from '../entities/bed.entity';
import { RequiredRulesType } from 'src/guards/policy/policy.type';

export type BedsSubjects = InferSubjects<typeof Bed>;
export type BedsAbilityType = PureAbility<[CaslActionsEnum, BedsSubjects]>;

// policy
export function BedsExternalPolicyFactory(
  context: ExecutionContext,
  reflector: Reflector,
  logger: Logger,
) {
  const { can, cannot, build } = new AbilityBuilder(
    PureAbility as AbilityClass<BedsAbilityType>,
  );

  const req: Request = context.switchToHttp().getRequest();
  const user = req.user;

  if (user?.isAdmin) {
    can(CaslActionsEnum.MANAGE, Bed);
  } else {
    // can(CaslActionsEnum.READ, Bed);
  }

  return build();
}

export const ReadBedsRule: RequiredRulesType<CaslActionsEnum, BedsSubjects> = {
  action: CaslActionsEnum.READ,
  subject: Bed,
};

export const WriteBedsRule: RequiredRulesType<CaslActionsEnum, BedsSubjects> = {
  action: CaslActionsEnum.WRITE,
  subject: Bed,
};
