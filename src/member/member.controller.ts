import {Body, Controller, Get, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {MemberService} from "./member.service";
import {ApiResponse} from "../api.response";
import {MemberLoginRequest} from "./dto/member.login";

@Controller('member')
export class MemberController {
    memberService: MemberService

    constructor(memberService: MemberService) {
        this.memberService = memberService
    }

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
    register(@Body() request: MemberLoginRequest): ApiResponse<String> {
        this.memberService.register(request);
        return ApiResponse.ok();
    }

}
