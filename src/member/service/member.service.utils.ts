import { Repository } from 'typeorm';
import { Member } from '../domain/member.entity';
import { HttpStatus } from '@nestjs/common';
import { BusinessException } from '../../exception/business.exception';

export class MemberServiceUtils {
  static async findMemberByEmail(memberRepository: Repository<Member>, email: string) {
    const member = await memberRepository.findOneBy({ email: email });
    if (member == null) {
      throw new BusinessException('회원이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }
    return member;
  }

  static async findMemberById(memberRepository: Repository<Member>, userId: any) {
    const member = await memberRepository.findOneBy({ id: userId });
    if (member == null) {
      throw new BusinessException('회원이 존재하지 않습니다.', HttpStatus.NOT_FOUND);
    }
    return member;
  }
}
