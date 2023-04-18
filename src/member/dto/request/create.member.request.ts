import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberRequest {
  @IsNotEmpty()
  @ApiProperty({ description: '이름' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ description: '이메일' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
