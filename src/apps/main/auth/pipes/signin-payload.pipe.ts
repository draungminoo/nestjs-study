import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { AjvService } from 'src/services/global/ajv/ajv.service';
import { ajvSigninPayloadSchema } from '../schema/signin-payload.schema';

@Injectable()
export class SigninPayloadPipe implements PipeTransform {
  constructor(private ajvService: AjvService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const validator = this.ajvService.buildValidator(ajvSigninPayloadSchema);

    if (validator(value)) {
      return value;
    } else {
      throw new NotAcceptableException(validator.errors);
    }
  }
}
