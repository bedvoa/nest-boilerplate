import UserSignInDto from '../dto/user-signin.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { IUserResponse } from '../dto/user-response.dto';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserPatchDto } from '../dto/user-patch.dto';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
            getUserByUuid: jest.fn(),
            updateUser: jest.fn(),
          },
        },
        {
          provide: AuthService,
          useValue: {
            jwtSignin: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (ctx: ExecutionContext) => {
          const req = ctx.switchToHttp().getRequest();
          req.user = {
            uuid: '4bf5cfa6-6574-4ea4-8b3b-3b3b3b3b3b3b',
            refreshToken: 'refreshToken-ffdkvndklj43-gmvndiuf9bndmf',
          };
          return true;
        },
      })
      .compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined UserController', () => {
    expect(userController).toBeDefined();
  });

  /** Test SignUp */
  describe('SignUp', () => {
    // Test Case 1: 모든 조건이 통과한다는 조건하에 회원가입이 성공하는 경우
    it('should successfully sign up a user', async () => {
      // given: 조건 설정
      const newUser: UserSignUpDto = {
        name: 'testName',
        nickname: 'testNickname',
        userId: 'testId',
        email: 'testEmail@test.com',
        password: 'testPassword',
        passwordConfirm: 'testPassword',
      };

      const expectedResult: IUserResponse = {
        uuid: '4bf5cfa6-6574-4ea4-8b3b-3b3b3b3b3b3b',
        status: true,
        code: 200,
      };

      // when: 테스트 실행을 위한 조건 설정(UserService.createUSer 메서드를 mockResolvedValue로 mocking)
      jest.spyOn(userService, 'createUser').mockResolvedValue(expectedResult);

      // then: 결과 검증
      expect(await userController.signUp(newUser)).toBe(expectedResult);
      expect(userService.createUser).toHaveBeenCalledWith(newUser);
    });

    // Test Case2: 회원가입이 실패하는 경우; DTO의 필수값이 누락된 경우
    it('should fail to sign up a user when required fields are missing', async () => {
      // given: 조건
      const newUser: UserSignUpDto = {
        name: 'testName',
        nickname: 'testNickname',
        userId: 'testId',
        email: '',
        password: 'testPassword',
        passwordConfirm: 'testPassword',
      };

      const expectedResult = {
        message: 'Bad Request',
        statusCode: 400,
      };

      // when: 테스트 실행을 위한 조건 설정
      jest.spyOn(userService, 'createUser').mockRejectedValue(expectedResult);

      // then: 결과 검증
      await expect(userController.signUp(newUser)).rejects.toEqual(
        expectedResult,
      );
      expect(userService.createUser).toHaveBeenCalledWith(newUser);
    });
  });

  /** Test SignIn */
  describe('SignIn', () => {
    // Test Case 1: 모든 조건이 통과한다는 조건하에 로그인이 성공하는 경우
    it('should successfully sign in a user', async () => {
      // given: 조건 설정
      const loginUser: UserSignInDto = {
        userId: 'testId',
        password: 'testPassword',
      };

      const expectedResult = {
        accessToken: 'accessToken-fdjvhckfdj-=fdvcmnfd',
        refreshToken: 'refreshToken-ffdkvndklj43-gmvndiuf9bndmf',
        userInfo: {
          email: 'testemail@test.com',
          userId: 'testId',
          nickname: 'testNickname',
          name: 'testName',
          status: true,
        },
      };

      // when: 테스트 실행을 위한 조건 설정(AuthService.jwtSignin 메서드를 mockResolvedValue로 mocking)
      jest.spyOn(authService, 'jwtSignin').mockResolvedValue(expectedResult);

      // then: 결과 검증
      expect(await userController.SignIn(loginUser)).toBe(expectedResult);
      expect(authService.jwtSignin).toHaveBeenCalledWith(loginUser);
    });

    // Test Case 2: 로그인이 실패하는 경우; DTO의 필수값이 누락된 경우
    it('should fail to sign in a user when required fields are missing', async () => {
      // given: 조건 설정
      const loginUser: UserSignInDto = {
        userId: 'testId',
        password: '',
      };

      const expectedResult = {
        message: 'Bad Request',
        statusCode: 400,
      };

      // when: 테스트 실행을 위한 조건 설정
      jest.spyOn(authService, 'jwtSignin').mockRejectedValue(expectedResult);

      // then: 결과 검증
      await expect(userController.SignIn(loginUser)).rejects.toEqual(
        expectedResult,
      );
      expect(authService.jwtSignin).toHaveBeenCalledWith(loginUser);
    });
  });

  /** Test MyInfo */
  describe('MyInfo', () => {
    // Test Case 1: 모든 조건이 통과한다는 조건하에 내 정보 조회가 성공하는 경우
    it('should successfully get my info', async () => {
      // given: 조건 설정
      const req = {
        user: {
          uuid: '4bf5cfa6-6574-4ea4-8b3b-3b3b3b3b3b3b',
          refreshToken: false,
        },
      };
      const expectedResult = {
        status: true,
        code: 200,
        uuid: '4bf5cfa6-6574-4ea4-8b3b-3b3b3b3b3b3b',
        name: 'testName',
        nickname: 'testNickname',
        userId: 'testId',
        email: 'testEmail@test.com',
      };

      // when: 테스트 실행을 위한 조건 설정
      jest
        .spyOn(userService, 'getUserByUuid')
        .mockResolvedValue(expectedResult);

      // then: 결과 검증
      expect(await userController.getMyInfo(req)).toBe(expectedResult);
      expect(userService.getUserByUuid).toHaveBeenCalledWith(req.user.uuid);
    });
  });

  /** Test UpdateUser */
  describe('UpdateUser', () => {
    // Test Case 1: 모든 조건이 통과한다는 조건하에 회원정보 수정이 성공하는 경우
    it('should successfully update a user', async () => {
      // given: 조건 설정
      const updateUser: UserPatchDto = {
        name: 'testName',
        nickname: 'testNickname',
        userId: 'testId',
        email: 'testEmail@test.com',
      };
      const uuid = '4bf5cfa6-6574-4ea4-8b3b-3b3b3b3b3b3b';

      const expectedResult = {
        status: true,
        code: 200,
        uuid: uuid,
      };

      // when: 테스트 실행을 위한 조건 설정
      jest.spyOn(userService, 'updateUser').mockResolvedValue(expectedResult);

      // then: 결과 검증
      expect(await userController.updateMyInfo(updateUser, uuid)).toBe(
        expectedResult,
      );
      expect(userService.updateUser).toHaveBeenCalledWith(updateUser, uuid);
    });

    // Test Case 2: 회원정보 수정이 실패하는 경우; uuid가 없는 경우
    it('should fail to update a user when uuid is missing', async () => {
      // given: 조건 설정
      const updateUser: UserPatchDto = {
        name: 'testName',
        nickname: 'testNickname',
        userId: 'testId',
        email: 'testEmail@test.com',
      };
      const uuid = undefined;

      const expectedResult = {
        message: 'Bad Request',
        statusCode: 400,
      };

      // when: 테스트 실행을 위한 조건 설정
      jest.spyOn(userService, 'updateUser').mockRejectedValue(expectedResult);

      // then: 결과 검증
      await expect(
        userController.updateMyInfo(updateUser, uuid),
      ).rejects.toEqual(expectedResult);
      expect(userService.updateUser).toHaveBeenCalledWith(updateUser, uuid);
    });
  });
});
