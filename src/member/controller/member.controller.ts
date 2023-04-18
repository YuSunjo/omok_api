import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { MemberService } from '../service/member.service';
import { ApiResponse } from '../../api.response';
import { MemberLoginRequest } from '../dto/request/member.login.request';
import { CreateMemberRequest } from '../dto/request/create.member.request';
import { PassportAuthGuard } from '../../configs/guard/passport.auth.guard';
import { UserId } from '../../configs/decorator/user.id.decorator';

@Controller()
export class MemberController {
  constructor(private memberService: MemberService) {}

  // 이메일 등록
  @Post('api/v1/signup')
  @UsePipes(new ValidationPipe())
  async signup(@Body() request: CreateMemberRequest) {
    await this.memberService.signup(request);
    return ApiResponse.ok();
  }

  // 이메일로 로그인
  @Post('api/v1/login')
  @UsePipes(new ValidationPipe())
  async login(@Body() request: MemberLoginRequest): Promise<ApiResponse<string>> {
    const token = await this.memberService.loginMember(request.email);
    return ApiResponse.success(token);
  }

  @Get('api/v1/member')
  @UseGuards(PassportAuthGuard)
  async getUser(@UserId() userId: number) {
    console.log(userId);
    await this.memberService.getUser(userId);
    return ApiResponse.success(await this.memberService.getUser(userId));
  }

  // 매칭
  // @Post('matching')
  // async matching(@Body() request: MatchingRequest) {
  //   this.memberService.matching(request.token);
  // }
}
