import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';
import { MemberService } from './service/member.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Member} from "./domain/member.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Member])
  ],
  exports: [TypeOrmModule],
  controllers: [MemberController],
  providers: [
      MemberService
  ]
})
export class MemberModule {}
