import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PlayOmokRequest {
  @ApiProperty({ description: 'roomId' })
  @IsNotEmpty()
  roomId: string;
  @ApiProperty({ description: '누구턴인가? (black, white)' })
  @IsNotEmpty()
  turn: string;
  @ApiProperty({ description: 'x좌표 - 0부터 ~ 18' })
  @IsNotEmpty()
  @Type(() => Number)
  x: number;
  @ApiProperty({ description: 'y좌표 - 0부터 ~ 18' })
  @IsNotEmpty()
  @Type(() => Number)
  y: number;
}
