import { Member } from '../../entities/member.entity';

export class MemberInfoResponse {
  id: number;
  email: string;
  name: string;

  constructor(id: number, email: string, name: string) {
    this.id = id;
    this.email = email;
    this.name = name;
  }

  static of(member: Member) {
    return new MemberInfoResponse(member.id, member.email, member.name);
  }
}
