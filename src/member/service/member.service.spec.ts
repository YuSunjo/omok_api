import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberService } from '../../../dist/member/service/member.service';
import { Member } from '../../../dist/member/entities/member.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../../configs/jwt/jwt.constants';

describe('MemberService', () => {
  let service: MemberService;
  let memberRepository: Repository<Member>;

  const MEMBER_REPOSITORY_TOKEN = getRepositoryToken(Member);

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          global: true,
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '24h' },
        }),
      ],
      providers: [
        MemberService,
        {
          provide: MEMBER_REPOSITORY_TOKEN,
          useValue: {
            find: jest.fn().mockResolvedValue([]),
            save: jest.fn(),
            findOne: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<MemberService>(MemberService);
    memberRepository = module.get<Repository<Member>>(MEMBER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('board repository should be defined', () => {
    expect(memberRepository).toBeDefined();
  });
});
