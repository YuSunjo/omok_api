import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

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

  @Prop()
  turn: string;

  @Prop({
    type: mongoose.Schema.Types.Array,
  })
  board;

  constructor(name: string, password: string, isPrivate: boolean) {
    this.roomId = uuidv4();
    this.name = name;
    this.password = password;
    this.isPrivate = isPrivate;
    this.isPlaying = false;
    this.player1 = '';
    this.player2 = '';
    this.turn = 'black';
    this.board = Array.from(Array(19), () => new Array(19).fill(0));
  }

  static newRoom(name: string, password: string, isPrivate: boolean) {
    return new Room(name, password, isPrivate);
  }
}

// 위의 작성한 클래스를 바탕으로 Mongoose에서 사용하는 스키마 클래스를 만들어준다.
export const RoomSchema = SchemaFactory.createForClass(Room);
