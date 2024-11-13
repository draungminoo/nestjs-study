import { Injectable, LoggerService } from '@nestjs/common';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import { RedisClientType, createClient } from 'redis';
import { ServerOptions } from 'socket.io';
import { AppEnvValues } from 'src/resources/env/app.env';

export const SOCKET_IO_ADAPTER = 'SOCKET_IO_ADAPTER';

const reconnectDelay = 10_000;

@Injectable()
export class SocketIoAdapter extends IoAdapter {
  server!: any;
  logger!: LoggerService;

  private AppPubClient!: RedisClientType<any>;
  private AppSubClient!: RedisClientType<any>;

  private adapterConstructor: ReturnType<typeof createAdapter> | null = null;

  setLogger(l: LoggerService) {
    this.logger = l;
  }

  async connectToRedis(): Promise<void> {
    try {
      // clean all previous connections
      if (this.AppPubClient) {
        this.AppPubClient.quit();
      }
      if (this.AppSubClient) {
        this.AppSubClient.quit();
      }

      // create new connections
      this.AppPubClient = createClient({
        url: AppEnvValues.REDIS_URL,
        socket: {
          reconnectStrategy: () => {
            return reconnectDelay;
          },
        },
      });
      this.AppSubClient = this.AppPubClient.duplicate();

      // redis on connected
      this.AppSubClient.on('connect', () => {
        this.logger.log(`App successfully connected to redis server.`);
      });

      // reconnecting to redis
      this.AppSubClient.on('reconnecting', () => {
        this.logger.log('App is reconnecting to redis server');
      });

      // redis on cerror
      this.AppSubClient.on('error', (error) => {
        this.logger.error(error);
      });

      // await client connections
      await Promise.all([
        this.AppPubClient.connect(),
        this.AppSubClient.connect(),
      ]);

      this.adapterConstructor = createAdapter(
        this.AppPubClient,
        this.AppSubClient,
      );
      this.server.adapter(this.adapterConstructor);
    } catch (error) {
      this.logger.log(`App cannot connect to redis server.`);
      setTimeout(async () => {
        await this.connectToRedis();
      }, reconnectDelay);
    }
  }

  createIOServer(port: number, options?: ServerOptions): any {
    console.log(port);
    this.server = super.createIOServer(port, { ...options });
    this.connectToRedis();
    return this.server;
  }
}
