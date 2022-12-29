import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MemberLoginRequest} from "../dto/member.login";
import {Member} from "../domain/member.entity";
import {Repository} from "typeorm";

@Injectable()
export class MemberService {

    // @ts-ignore
    constructor(@InjectRepository(Member)
                private memberRepository: Repository<Member>
    ) {}

    login() {
    }

    async register(request: MemberLoginRequest): Promise<Member> {
        let member2 = request.toEntity();
        let member1 = new Member("name", request.email);
        return this.memberRepository.save(member1);
    }

}
