import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from '../room/schema/room.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Server, Socket } from 'net';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'room',
  cors: {
    origin: ['*'],
  },
})
export class EventGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('RoomEvent');

  @WebSocketServer()
  server: Server;

  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}

  afterInit() {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓 연결`);
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`소켓 연결 해제 ❌`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(`${client.id} : ${payload}`);
    return 'Hello world!';
  }

  @SubscribeMessage('joinRoom')
  async handleJoin(@ConnectedSocket() socket: Socket, @MessageBody() payload: string): Promise<Room> {
    const joinRoomRequest: JoinRoom = JSON.parse(payload);
    const room = await this.roomModel.findOne({
      roomId: joinRoomRequest.roomId,
    });
    socket.emit('joinRoom', room);
    return room;
  }

  @SubscribeMessage('newRoom')
  handleNewRoom(): string {
    const board = Array.from(Array(19), () => new Array(19).fill(0));
    this.roomModel.create({
      roomId: uuidv4(),
      board: board,
    });
    return 'Hello world!';
  }
}
