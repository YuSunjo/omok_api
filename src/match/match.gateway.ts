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

@WebSocketGateway({
  namespace: 'match',
  cors: {
    origin: ['*'],
  },
})
export class MatchGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('MathEvent');

  @WebSocketServer()
  server: Server;

  constructor(
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
    console.log('matchRequest', payload);
    const matchRequest = JSON.parse(payload);
    console.log('matchRequest', matchRequest);
    const newMatch: MatchDocument = await this.matchModel.create(Match.insertQueue(socket.id, matchRequest.user_id));
    const match = await this.matchModel.find({
      gt: newMatch.createdAt,
    });
    // 앞에 들어온게 있다면 두개를 특정 room에 넣는다.
    // 그 후에 삭제한다.
    // 만약 본인밖에 없다면 바로 리턴한다.
    console.log('match', match);
  }
}
