import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MatchGateway } from './match.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Match, MatchSchema } from './schema/match.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Match.name, schema: MatchSchema }])],
  controllers: [MatchController],
  providers: [MatchService, MatchGateway],
})
export class MatchModule {}
