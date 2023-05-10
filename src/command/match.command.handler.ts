import { MatchCommand } from './match.command';
import { CommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { Match, MatchDocument } from '../match/schema/match.schema';
import { Model } from 'mongoose';

@CommandHandler(MatchCommand)
export class MatchCommandHandler {
  constructor(@InjectModel(Match.name) private matchModel: Model<MatchDocument>) {}

  async execute(command: MatchCommand) {
    const { socketId, matchDocument } = command;
    console.log('commandHandler', socketId, matchDocument);
    const matchList = await this.matchModel.find({
      createdAt: { $lte: matchDocument.createdAt },
    });
    console.log('matchList', matchList);
    if (matchList.length > 1) {
      return [matchList[0], matchList[1]];
    }
    return matchList;
  }
}
