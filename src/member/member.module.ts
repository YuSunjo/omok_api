import { Module } from '@nestjs/common';
import { MemberController } from './controller/member.controller';
import { MemberService } from './service/member.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './domain/member.entity';
import { jwtConstants } from '../configs/jwt/jwt.constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../configs/jwt/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [TypeOrmModule],
  controllers: [MemberController],
  providers: [MemberService, JwtStrategy],
})
export class MemberModule {}
