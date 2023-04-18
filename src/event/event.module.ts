import { Module } from '@nestjs/common';
import { EventGateway } from './event.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomSchema, Room } from './schema/room.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }])],
  providers: [EventGateway],
})
export class EventModule {}
