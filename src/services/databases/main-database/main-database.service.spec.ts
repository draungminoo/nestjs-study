import { Test, TestingModule } from '@nestjs/testing';
import { MainDatabaseService } from './main-database.service';

describe('MainDatabaseService', () => {
  let service: MainDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainDatabaseService],
    }).compile();

    service = module.get<MainDatabaseService>(MainDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
