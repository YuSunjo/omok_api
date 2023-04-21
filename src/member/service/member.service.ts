import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Member } from '../entities/member.entity';
import { Repository } from 'typeorm';
import { MemberServiceUtils } from './member.service.utils';
import { CreateMemberRequest } from '../dto/request/create.member.request';
import { Transactional } from 'typeorm-transactional';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MemberInfoResponse } from '../dto/response/member.info.response';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
    private readonly jwtService: JwtService,
  ) {}

  @Transactional()
  async signup(request: CreateMemberRequest) {
    await MemberServiceUtils.validateMemberByEmail(this.memberRepository, request.email);
    const encodedPassword = await bcrypt.hash(request.password, 10);
    return this.memberRepository.save(Member.newMember(request.email, encodedPassword, request.name));
  }

  async loginMember(email: string) {
    const member = await MemberServiceUtils.findMemberByEmail(this.memberRepository, email);
    return await this.jwtService.signAsync({ id: member.id });
  }

  async getUser(id: number) {
    const member = await MemberServiceUtils.findMemberById(this.memberRepository, id);
    return MemberInfoResponse.of(member);
  }

  /**
   * 매칭 API
   * token 을 복호화 -> userId를 찾음 -> mongoDB에 넣고 -> 응답해줌
   * mongoDB 에서 매칭이 된다면 -> 응답해줌
   */
  // async matching(token: string) {
  //   const userId = await JwtConfig.decodeToken(token);
  //   const member = await MemberServiceUtils.findMemberById(this.memberRepository, userId);
  // }
}
