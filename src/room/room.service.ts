import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { RoomInfoResponse } from './dto/response/room.info.response';
import { RoomNameResponse } from './dto/response/room.name.response';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from '../event/schema/room.schema';

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

  async findOne(id: number) {
    const room = await this.roomModel.findOne({ roomId: id });
    return RoomInfoResponse.of(room);
  }

  async remove(id: number) {
    await this.roomModel.remove({ roomId: id });
  }
}
