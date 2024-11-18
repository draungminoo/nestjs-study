import { AppGuard } from './app-guard.guard';

describe('TokenGuard', () => {
  it('should be defined', () => {
    expect(new AppGuard()).toBeDefined();
  });
});
