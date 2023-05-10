import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchGateway } from './match.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './schema/match.schema';
import { Room, RoomSchema } from '../room/schema/room.schema';
import { CqrsModule } from '@nestjs/cqrs';
import { MatchCommandHandler } from '../command/match.command.handler';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Match.name, schema: MatchSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
    CqrsModule,
  ],
  controllers: [],
  providers: [MatchService, MatchGateway, MatchCommandHandler],
})
export class MatchModule {}
