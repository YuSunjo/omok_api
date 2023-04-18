import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberLoginRequest } from '../dto/member.login';
import { Member } from '../domain/member.entity';
import { Repository } from 'typeorm';
import { JwtConfig } from '../../../configs/jwt.config';
import { MemberServiceUtils } from './member.service.utils';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private memberRepository: Repository<Member>,
  ) {}

  async loginMember(email: string) {
    const member = await MemberServiceUtils.findMemberByEmail(this.memberRepository, email);
    return JwtConfig.generateToken(member.id);
  }

  async register(request: MemberLoginRequest): Promise<Member> {
    const member = Member.newMember(request.email);
    return this.memberRepository.save(member);
  }

  /**
   * 매칭 API
   * token 을 복호화 -> userId를 찾음 -> mongoDB에 넣고 -> 응답해줌
   * mongoDB 에서 매칭이 된다면 -> 응답해줌
   */
  async matching(token: string) {
    const userId = await JwtConfig.decodeToken(token);
    const member = await MemberServiceUtils.findMemberById(this.memberRepository, userId);
  }
}
