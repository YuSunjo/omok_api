import { Controller, Get, Post, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { ApiResponse } from '../api.response';

@Controller()
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post('api/v1/room')
  @UsePipes(new ValidationPipe())
  async createRoom(@Body() request: CreateRoomDto) {
    return ApiResponse.success(await this.roomService.createRoom(request));
  }

  @Get('api/v1/room/all')
  async retrieveRoom() {
    return ApiResponse.success(await this.roomService.retrieveRoom());
  }

  @Get('api/v1/room/:id')
  async findOne(@Param('id') id: number) {
    const roomInfoResponse = await this.roomService.findOne(id);
    return ApiResponse.success(roomInfoResponse);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
  //   return this.roomService.update(+id, updateRoomDto);
  // }

  @Delete('api/v1/room/:id')
  async remove(@Param('id') id: number) {
    await this.roomService.remove(id);
    return ApiResponse.ok();
  }
}
