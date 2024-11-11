import { Test, TestingModule } from '@nestjs/testing';
import { AjvService } from './ajv.service';

describe('AjvService', () => {
  let service: AjvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AjvService],
    }).compile();

    service = module.get<AjvService>(AjvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
