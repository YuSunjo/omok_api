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
import { Model } from 'mongoose';
import { Server } from 'net';
import { Logger } from '@nestjs/common';
import { Match, MatchDocument } from './schema/match.schema';
import { Room, RoomDocument } from '../room/schema/room.schema';
import { CommandBus } from '@nestjs/cqrs';
import { MatchCommand } from '../command/match.command';

@WebSocketGateway({
  namespace: 'match',
  cors: {
    origin: ['*'],
  },
})
export class MatchGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('MathEvent');
  createdRooms: string[] = [];

  @WebSocketServer()
  server: Server;

  constructor(
    private readonly commandBus: CommandBus,
    @InjectModel(Match.name) private matchModel: Model<MatchDocument>,
    @InjectModel(Room.name) private roomModel: Model<RoomDocument>,
  ) {}

  afterInit() {
    this.logger.log('웹소켓 서버 초기화 ✅');
  }

  handleConnection(@ConnectedSocket() socket: any) {
    console.log(socket.id);
    this.logger.log(`소켓 연결`);
  }

  handleDisconnect(@ConnectedSocket() socket: any) {
    this.logger.log(`소켓 연결 해제 ❌`);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    console.log(`${client.id} : ${payload}`);
    client.emit('message', '매칭완료');
    return 'Hello world!';
  }

  /**
   * match 정보로 user_id와 Socket id를 받는다.
   * @param socket
   * @param payload
   */
  @SubscribeMessage('match')
  async handleMatch(@ConnectedSocket() socket: any, @MessageBody() payload: string) {
    console.log('socket', socket.id);
    const matchRequest = JSON.parse(payload);
    const newMatch: MatchDocument = await this.matchModel.create(Match.insertQueue(socket.id, matchRequest.userId));
    // 매칭 로직
    const newVar = await this.commandBus.execute(new MatchCommand(socket.id, newMatch));
    console.log(newVar);

    // 대기열에 아무도 없다면 본인이 방을 만든다.
    if (newVar.length == 1) {
      this.server.emit('create-room', { roomName: `userId${newVar[0].userId}` });
      console.log('newVar', newVar);
      socket.join(`userId${newVar[0].userId}`);
      return;
    }
    // 대기열에 누군가가 있다면 이전사람이 만든 방에 들어간다.
    console.log('----------------------------');
    console.log('newVar', newVar);
    socket.join(`userId${newVar[0].userId}`);
    await this.matchModel.deleteMany({ id: { $in: [newVar[0].id, newVar[1].id] } });
    socket.broadcast.to(`userId${newVar[0].userId}`).emit('message', '매칭완료');
    socket.emit('message', '매칭완료');
    console.log('----------------------------');
  }

  @SubscribeMessage('cancel-match')
  async handleCancelMatch(@ConnectedSocket() socket: any, @MessageBody() payload: string) {
    console.log('socket', socket.id);
    const matchRequest = JSON.parse(payload);
    await this.matchModel.deleteOne({ id: socket.id, userId: matchRequest.userId });
    socket.emit('message', '매칭취소');
  }

  @SubscribeMessage('room-list')
  handleRoomList() {
    return this.createdRooms;
  }
}
