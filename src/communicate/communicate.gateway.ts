import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { ReadService } from 'src/read/read.service';
import { WriteService } from 'src/write/write.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class CommunicateGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly writeService: WriteService,
    private readonly readService: ReadService,
  ) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('CommunicateGateway');

  @SubscribeMessage('set pixel')
  setPixel(client: Socket, payload): void {
    this.writeService.setPixel(
      payload.x,
      payload.y,
      payload.color,
      payload.user,
    );
    this.server.emit('update pixel', payload);
  }

  @SubscribeMessage('get user')
  getUser(client: Socket, payload): void {
    client.emit('user info', this.readService.getUser(payload.x, payload.y));
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
