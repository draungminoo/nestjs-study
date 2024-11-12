import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { BehaviorSubject } from 'rxjs';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'beds-admin',
  transports: ['websocket'],
})
export class BedsAdminGateway implements OnGatewayConnection {
  bedNoAcceptedSub = new BehaviorSubject<{
    adminClient: Socket;
    clientId: string;
    bedNo: string;
  }>({
    adminClient: null,
    clientId: null,
    bedNo: null,
  });

  @WebSocketServer()
  adminServer: Socket;

  @SubscribeMessage('accept-bed-no')
  acceptBedNo(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: { clientId: string; bedNo: string },
  ) {
    this.bedNoAcceptedSub.next({
      adminClient: client,
      clientId: payload.clientId,
      bedNo: payload.bedNo,
    });
  }

  sendBedRequstToAdminPortal(clientId: string, bedNo: string) {
    this.adminServer.emit('incoming-bed-request', { clientId, bedNo });
  }

  handleConnection(@ConnectedSocket() client: Socket) {
    const token = client.handshake.query.token as string;
    console.log(token);

    if (token != '123') {
      console.log('Invalid token');
      client.disconnect(true);
      return;
    }
  }
}
