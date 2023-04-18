import { IsEmail, IsNotEmpty } from 'class-validator';
import { Member } from '../domain/member.entity';
import { ApiProperty } from '@nestjs/swagger';

export class MemberLoginRequest {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: '이름' })
  email: string;

  constructor(email: string) {
    this.email = email;
  }

  toEntity() {
    return new Member('', this.email);
  }
}

export class MatchingRequest {
  @IsNotEmpty()
  token: string;
}
