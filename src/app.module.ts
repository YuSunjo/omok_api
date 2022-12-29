import { Module } from '@nestjs/common';
import { MemberModule } from './member/member.module';
import { PingModule } from './ping/ping.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeormConfig} from "../configs/typeorm.config";

@Module({
  imports: [
      TypeOrmModule.forRoot(typeormConfig),
      MemberModule,
      PingModule
  ],
})
export class AppModule {}
