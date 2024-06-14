import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dto/auth-signin.dto';
import { UserDao } from 'src/modules/user/dao/user.dao';
import { JwtService } from '@nestjs/jwt';
import { IAuthResponseDto } from '../dto/response.dto';
import { BadRequestConstant } from 'src/constant/response.constant';

@Injectable()
export class AuthService {
  constructor(
    private readonly userDao: UserDao,
    private readonly jwtService: JwtService,
  ) {}

  async jwtSignin(params: SignInDto): Promise<IAuthResponseDto> {
    try {
      const user = await this.userDao.getUserInfoByUserId({
        userId: params.userId,
      });

      if (!user) {
        throw new UnauthorizedException(
          BadRequestConstant.UNAUTHORIZED_MESSAGE,
          BadRequestConstant.UNAUTHORIZED_USER,
        );
      }

      const isMatchedPassword = await bcrypt.compare(
        params.password,
        user.password,
      );
      if (!isMatchedPassword) {
        throw new UnauthorizedException(
          BadRequestConstant.UNAUTHORIZED_MESSAGE,
          BadRequestConstant.UNAUTHORIZED_USER,
        );
      }

      if (user.status === false) {
        throw new ForbiddenException(
          BadRequestConstant.FORBIDDEN_MESSAGE,
          BadRequestConstant.FORBIDDEN_USER,
        );
      }

      return {
        accessToken: this.jwtService.sign({
          uuid: user.uuid,
          refreshToken: false,
        }),
        refreshToken: this.jwtService.sign({
          uuid: user.uuid,
          refreshToken: true,
        }),
        userInfo: {
          email: user.email,
          userId: user.userId,
          nickname: user.nickname,
          name: user.name,
          status: user.status,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}
