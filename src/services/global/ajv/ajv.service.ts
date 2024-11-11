import { Injectable } from '@nestjs/common';
import Ajv from 'ajv';
import ajvErrors from 'ajv-errors';

@Injectable()
export class AjvService {
  private ajv: Ajv;

  constructor() {
    this.ajv = new Ajv({ allErrors: true });
    ajvErrors(this.ajv);
  }

  getAjv() {
    return this.ajv;
  }

  buildValidator(schema: object) {
    return this.ajv.compile(schema);
  }
}
