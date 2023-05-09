import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { BusinessException } from '../../exception/business.exception';

export type RoomDocument = Room & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Room {
  @Prop({
    default: uuidv4(),
    required: true,
  })
  roomId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  password: string;

  @Prop()
  isPrivate: boolean;

  @Prop()
  isPlaying: boolean;

  @Prop()
  player1: string;

  @Prop()
  player2: string;

  // black or white
  @Prop()
  turn: string;

  // 1: black, 2: white
  @Prop({
    type: mongoose.Schema.Types.Array,
  })
  board;

  // constructor(name: string, password: string, isPrivate: boolean) {
  //   this.roomId = uuidv4();
  //   this.name = name;
  //   this.password = password;
  //   this.isPrivate = isPrivate;
  //   this.isPlaying = false;
  //   this.player1 = '';
  //   this.player2 = '';
  //   this.turn = 'black';
  //   this.board = Array.from(Array(19), () => new Array(19).fill(0));
  // }

  constructor(
    roomId: string,
    name: string,
    password: string,
    isPrivate: boolean,
    isPlaying: boolean,
    player1: string,
    player2: string,
    turn: string,
    board,
  ) {
    this.roomId = roomId;
    this.name = name;
    this.password = password;
    this.isPrivate = isPrivate;
    this.isPlaying = isPlaying;
    this.player1 = player1;
    this.player2 = player2;
    this.turn = turn;
    this.board = board;
  }

  static newRoom(name: string, password: string, isPrivate: boolean) {
    return new Room(
      uuidv4(),
      name,
      password,
      isPrivate,
      false,
      '',
      '',
      'black',
      Array.from(Array(19), () => new Array(19).fill(0)),
    );
  }

  static plainToClass(room: Room) {
    return new Room(
      room.roomId,
      room.name,
      room.password,
      room.isPrivate,
      room.isPlaying,
      room.player1,
      room.player2,
      room.turn,
      room.board,
    );
  }

  async isPossible(x: number, y: number, turn: string) {
    if (this.board[x][y] !== 0) {
      throw new BusinessException('이미 돌이 놓여져 있습니다.');
    }
    if (this.turn !== turn) {
      throw new BusinessException('잘못된 턴입니다.');
    }
    this.board[x][y] = turn === 'black' ? 1 : 2;
    this.turn = turn === 'black' ? 'white' : 'black';
  }
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const RoomSchema = SchemaFactory.createForClass(Room);
