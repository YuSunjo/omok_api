import { Room } from '../../schema/room.schema';

export class RoomInfoResponse {
  roomId: string;
  name: string;
  isPrivate: boolean;
  isPlaying: boolean;
  player1: string;
  player2: string;
  turn: string;
  board: string;

  constructor(
    roomId: string,
    name: string,
    isPrivate: boolean,
    isPlaying: boolean,
    player1: string,
    player2: string,
    turn: string,
    board: string,
  ) {
    this.roomId = roomId;
    this.name = name;
    this.isPrivate = isPrivate;
    this.isPlaying = isPlaying;
    this.player1 = player1;
    this.player2 = player2;
    this.turn = turn;
    this.board = board;
  }

  static of(room: Room) {
    return new RoomInfoResponse(
      room.roomId,
      room.name,
      room.isPrivate,
      room.isPlaying,
      room.player1,
      room.player2,
      room.turn,
      room.board,
    );
  }
}
