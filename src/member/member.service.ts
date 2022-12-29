import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MemberLoginRequest} from "./dto/member.login";
import {Member} from "./member.entity";
import {Repository} from "typeorm";
import {MemberRepository} from "./member.repository";

@Injectable()
export class MemberService {

    // @ts-ignore
    constructor(@InjectRepository(MemberRepository)
                private memberRepository: Repository<Member>
    ) {}

    login() {
    }

    async register(request: MemberLoginRequest): Promise<Member> {
        let member = this.memberRepository.create(new Member("name", request.email));
        await this.memberRepository.save(member);
        return member;
    }

}
