import {IsEmail, isNotEmpty, IsNotEmpty} from "class-validator";
import {Member} from "../domain/member.entity";

export class MemberLoginRequest {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    constructor(email: string) {
        this.email = email;
    }

    toEntity() {
        return new Member("", this.email);
    }

}

export class MatchingRequest {

    @IsNotEmpty()
    token: string;

}