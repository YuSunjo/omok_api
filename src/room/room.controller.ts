import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/request/create-room.dto';
import { ApiResponse } from '../api.response';
import { PlayOmokRequest } from './dto/request/play.omok.request';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('api/v1/room')
  async createRoom(@Body() request: CreateRoomDto) {
    return ApiResponse.success(await this.roomService.createRoom(request));
  }

  @Get('api/v1/room/all')
  async retrieveRoom() {
    return ApiResponse.success(await this.roomService.retrieveRoom());
  }

  @Get('api/v1/room/:roomId')
  async findOne(@Param('roomId') roomId: string) {
    const roomInfoResponse = await this.roomService.findOne(roomId);
    return ApiResponse.success(roomInfoResponse);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
  //   return this.roomService.update(+id, updateRoomDto);
  // }

  @Delete('api/v1/room/:roomId')
  async remove(@Param('roomId') roomId: string) {
    await this.roomService.remove(roomId);
    return ApiResponse.ok();
  }

  @Post('api/v1/room/omok')
  async playOmok(@Body() request: PlayOmokRequest) {
    return ApiResponse.success(await this.roomService.playOmok(request));
  }
}
