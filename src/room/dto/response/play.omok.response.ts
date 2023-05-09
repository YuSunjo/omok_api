import { Room } from '../../schema/room.schema';

export class PlayOmokResponse {
  roomId: string;
  turn: string;
  x: number;
  y: number;
  winner: string;

  constructor(roomId: string, turn: string, x: number, y: number, winner: string) {
    this.roomId = roomId;
    this.turn = turn;
    this.x = x;
    this.y = y;
    this.winner = winner;
  }

  static of(room: Room, x, y, turn, isWin: number) {
    let winner = '';
    if (isWin === 1) {
      winner = turn;
    }
    return new PlayOmokResponse(room.roomId, room.turn, x, y, winner);
  }
}
