import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MemberLoginRequest} from "../dto/member.login";
import {Member} from "../domain/member.entity";
import {Repository} from "typeorm";

@Injectable()
export class MemberService {

    constructor(@InjectRepository(Member)
                private memberRepository: Repository<Member>
    ) {}

    login() {
    }

    async register(request: MemberLoginRequest): Promise<Member> {
        let member = Member.newMember(request.email);
        return this.memberRepository.save(member);
    }

}
