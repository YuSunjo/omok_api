import { Room } from '../../../event/schema/room.schema';

export class RoomNameResponse {
  roomId: string;
  name: string;

  constructor(roomId: string, name: string) {
    this.roomId = roomId;
    this.name = name;
  }

  static of(room: Room) {
    return new RoomNameResponse(room.roomId, room.name);
  }
}
