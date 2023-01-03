import {IsEmail, IsNotEmpty} from "class-validator";
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