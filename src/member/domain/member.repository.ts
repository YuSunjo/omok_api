import { Repository } from 'typeorm';
import { Member } from './member.entity';
import { CustomRepository } from '../../../configs/typeorm-ex.decorator';

@CustomRepository(Member)
export class MemberRepository extends Repository<Member> {}
