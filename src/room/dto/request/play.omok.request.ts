import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PlayOmokRequest {
  @IsNotEmpty()
  roomId: string;
  @IsNotEmpty()
  turn: string;
  @IsNotEmpty()
  @Type(() => Number)
  x: number;
  @IsNotEmpty()
  @Type(() => Number)
  y: number;
}
