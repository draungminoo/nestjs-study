import {
  ArgumentMetadata,
  Injectable,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';
import { AjvService } from 'src/services/global/ajv/ajv.service';
import { ajvCreateUserPayloadSchema } from '../schema/create-user-payload.schema';

@Injectable()
export class CreateUserPayloadPipe implements PipeTransform {
  constructor(private ajvService: AjvService) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const validator = this.ajvService.buildValidator(
      ajvCreateUserPayloadSchema,
    );

    if (validator(value)) {
      return value;
    } else {
      throw new NotAcceptableException(validator.errors);
    }
  }
}
