import {IsEmail, IsNotEmpty} from "class-validator";
import {Member} from "../domain/member.entity";

export class MemberLoginRequest {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    toEntity() {
        return new Member("", this.email);
    }

}