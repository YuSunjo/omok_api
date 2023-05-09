import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @IsNotEmpty()
  @ApiProperty({ description: '방 이름' })
  name: string;
  @ApiProperty({ description: '비밀번호' })
  password: string;
  @ApiProperty({ description: '비공개 여부', default: false })
  isPrivate = false;

  constructor(name: string, password: string, isPrivate: boolean) {
    this.name = name;
    this.password = password;
    this.isPrivate = isPrivate;
  }
}
