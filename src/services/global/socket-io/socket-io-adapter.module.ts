import { Module } from '@nestjs/common';
import { SocketIoAdapter } from './socket-io.adapter';

@Module({
  providers: [SocketIoAdapter],
  exports: [SocketIoAdapter],
})
export class SocketIoAdapterModule {}
