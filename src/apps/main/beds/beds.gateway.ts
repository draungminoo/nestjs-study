import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'beds',
  transports: ['websocket'],
})
export class BedsGateway {
  bedRequestSub = new BehaviorSubject<{ client: Socket; bedNo: string }>({
    client: null,
    bedNo: null,
  });

  @WebSocketServer()
  clientServer: Socket;

  @SubscribeMessage('requst-bed')
  handleMessage(@ConnectedSocket() client: Socket, @MessageBody() bedNo: any) {
    this.bedRequestSub.next({ client, bedNo });
  }

  notifyClientBedNoAccepted(clientId: string, bedNo: string) {
    this.clientServer.emit(`bed-no-accepted-${clientId}`, bedNo);
  }
}
