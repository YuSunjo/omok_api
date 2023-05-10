import { MatchDocument } from '../match/schema/match.schema';

export class MatchCommand {
  socketId: string;
  matchDocument: MatchDocument;
  constructor(socketId, matchDocument) {
    this.socketId = socketId;
    this.matchDocument = matchDocument;
  }
}
