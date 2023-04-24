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
import { Server, Socket } from 'net';
import { Logger } from '@nestjs/common';
import { MatchRequest } from './dto/match.request';
import { Match, MatchDocument } from './schema/match.schema';

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

  constructor(@InjectModel(Match.name) private matchModel: Model<MatchDocument>) {}

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

  /**
   * match 정보로 user_id와 Socket id를 받는다.
   * @param socket
   * @param matchRequest
   */
  @SubscribeMessage('match')
  async handleMatch(@ConnectedSocket() socket: any, @MessageBody() matchRequest: MatchRequest) {
    console.log('socket', socket.id);
    console.log('matchRequest', matchRequest);
    console.log(matchRequest.userId);
    this.matchModel.find();
  }
}
