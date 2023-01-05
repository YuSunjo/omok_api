import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MemberLoginRequest} from "../dto/member.login";
import {Member} from "../domain/member.entity";
import {Repository} from "typeorm";
import {JwtConfig} from "../../../configs/jwt.config";
import {MemberServiceUtils} from "./member.service.utils";

@Injectable()
export class MemberService {

    constructor(@InjectRepository(Member)
                private memberRepository: Repository<Member>
    ) {}

    async loginMember(email: string) {
        const member = await MemberServiceUtils.findMemberByEmail(this.memberRepository, email);
        return JwtConfig.generateToken(member.id);
    }

    async register(request: MemberLoginRequest): Promise<Member> {
        let member = Member.newMember(request.email);
        return this.memberRepository.save(member);
    }

}
