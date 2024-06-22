import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../service/user.service';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { IUserResponse } from '../dto/user-response.dto';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            createUser: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // signup
  it('should create user', async () => {
    const userSignUpDto: UserSignUpDto = {
      name: 'test',
      nickname: 'test',
      userId: 'testid',
      password: 'test',
      email: 'test@test.com',
      passwordConfirm: 'test',
    } as UserSignUpDto;

    const userResponse: IUserResponse = {
      uuid: 'f7b1f1b0-7f3b-4b0b-8e0b-3b3b3b3b3b3b',
      status: true,
      code: 200,
    } as IUserResponse;
  });
});
