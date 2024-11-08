import { Test, TestingModule } from '@nestjs/testing';
import { SecondaryDatabaseService } from './secondary-database.service';

describe('BackupDatabaseService', () => {
  let service: SecondaryDatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecondaryDatabaseService],
    }).compile();

    service = module.get<SecondaryDatabaseService>(SecondaryDatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
