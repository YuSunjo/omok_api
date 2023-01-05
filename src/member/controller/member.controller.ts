import {Body, Controller, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {MemberService} from "../service/member.service";
import {ApiResponse} from "../../api.response";
import {MemberLoginRequest} from "../dto/member.login";
import {Member} from "../domain/member.entity";

@Controller('member')
export class MemberController {

    constructor(private memberService: MemberService) {}

    // 이메일로 로그인
    @Post('login')
    @UsePipes(new ValidationPipe())
    async login(@Body() request: MemberLoginRequest): Promise<ApiResponse<string>> {
        const token = await this.memberService.loginMember(request.email);
        return ApiResponse.success(token);
    }

    // 이메일 등록
    @Post('register')
    @UsePipes(new ValidationPipe())
    async register(@Body() request: MemberLoginRequest): Promise<ApiResponse<Promise<Member>>> {
        return ApiResponse.success(this.memberService.register(request));
    }

}
