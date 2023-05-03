import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Match, MatchDocument } from './schema/match.schema';
import { Model } from 'mongoose';

@Injectable()
export class MatchService {
  constructor(@InjectModel(Match.name) private matchModel: Model<MatchDocument>) {}
}
