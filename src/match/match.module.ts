import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchGateway } from './match.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './schema/match.schema';
import { Room, RoomSchema } from '../room/schema/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
  ],
  controllers: [],
  providers: [MatchService, MatchGateway],
})
export class MatchModule {}
