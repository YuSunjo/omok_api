import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/request/create-room.dto';
import { RoomInfoResponse } from './dto/response/room.info.response';
import { RoomNameResponse } from './dto/response/room.name.response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from './schema/room.schema';
import { PlayOmokRequest } from './dto/request/play.omok.request';
import { PlayOmokResponse } from './dto/response/play.omok.response';
import { Common } from '../common/common';

@Injectable()
export class RoomService {
  constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) {}
  async createRoom(request: CreateRoomDto) {
    const room = await this.roomModel.create(Room.newRoom(request.name, request.password, request.isPrivate));
    return RoomInfoResponse.of(room);
  }

  async retrieveRoom() {
    const roomList = await this.roomModel.find();
    return roomList.map((room) => RoomNameResponse.of(room));
  }

  async findOne(roomId: string) {
    const room = await this.roomModel.findOne({ roomId: roomId });
    return RoomInfoResponse.of(room);
  }

  async remove(roomId: string) {
    await this.roomModel.remove({ roomId: roomId });
  }

  async playOmok(request: PlayOmokRequest) {
    const plainRoom: Room = await this.roomModel.findOne({ roomId: request.roomId });
    const room = Common.roomPlainToClass(plainRoom);
    if (room === null) {
      throw new NotFoundException('방을 찾을 수 없습니다.');
    }
    await room.isPossible(request.x, request.y, request.turn);
    const isWin = Common.validateWinner(room.board);
    await this.roomModel.updateOne({ roomId: request.roomId }, { $set: { board: room.board, turn: room.turn } });
    return PlayOmokResponse.of(room, request.x, request.y, request.turn, isWin);
  }
}
