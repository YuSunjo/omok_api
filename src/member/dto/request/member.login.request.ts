import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MemberLoginRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이름' })
  email: string;
  @ApiProperty({ description: '비밀번호' })
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}
