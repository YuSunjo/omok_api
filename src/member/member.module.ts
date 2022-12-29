import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MemberRepository} from "./member.repository";

@Module({
  imports: [
    TypeOrmModule.forFeature([MemberRepository])
  ],
  controllers: [MemberController],
  providers: [
      MemberService
  ]
})
export class MemberModule {}
