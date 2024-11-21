import { LoggerMiddleware } from './middleware-logger.middleware';

describe('MiddlewareLoggerMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggerMiddleware()).toBeDefined();
  });
});
