import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
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
    login(@Body() request: MemberLoginRequest): ApiResponse<String> {
        this.memberService.login();
        return ApiResponse.ok();
    }

    // 이메일 등록
    @Post('register')
    @UsePipes(new ValidationPipe())
    register(@Body() request: MemberLoginRequest): ApiResponse<Promise<Member>> {
        return ApiResponse.success(this.memberService.register(request));
    }

}
