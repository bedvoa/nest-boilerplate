import * as bcrypt from 'bcrypt';
import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { UserDao } from '../dao/user.dao';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { InsertResult } from 'typeorm';
import { IUserResponse } from '../dto/user-response.dto';
import { BadRequestConstant } from 'src/constant/response.constant';
import { RequestWithUser } from 'src/common/interfaces/user.interface';
import { UserPatchDto } from '../dto/user-patch.dto';

@Injectable()
export class UserService {
  constructor(private readonly userDao: UserDao) {}

  /** Logger field */
  private logger = new Logger('UserService');

  /** Error handling method */
  private handleError(message: string, error: Error) {
    this.logger.error(message);
    throw error;
  }

  /** API */
  async createUser(paramsUserInfo: UserSignUpDto): Promise<IUserResponse> {
    try {
      // userId check
      const userByUserId = await this.userDao.getUserInfoByUserId({
        userId: paramsUserInfo.userId,
      });

      if (userByUserId) {
        throw new BadRequestException(
          BadRequestConstant.MESSAGE,
          BadRequestConstant.EXIST_USER_ID,
        );
      }

      // email check
      const userByEmail = await this.userDao.getUserInfoByUserEmail({
        email: paramsUserInfo.email,
      });

      if (userByEmail) {
        throw new BadRequestException(
          BadRequestConstant.MESSAGE,
          BadRequestConstant.EXIST_EMAIL,
        );
      }

      // nickname check
      const userByNickname = await this.userDao.getUserInfoByUserNickname({
        nickname: paramsUserInfo.nickname,
      });

      if (userByNickname) {
        throw new BadRequestException(
          BadRequestConstant.MESSAGE,
          BadRequestConstant.EXIST_NICKNAME,
        );
      }

      // password, passwordConfirm check
      if (
        !this.checkPassword(
          paramsUserInfo.password,
          paramsUserInfo.passwordConfirm,
        )
      ) {
        throw new BadRequestException(
          BadRequestConstant.MESSAGE,
          BadRequestConstant.PASSWORD_NOT_EQUAL,
        );
      }

      // password hash
      const hashedPassword = await bcrypt.hash(
        paramsUserInfo.password,
        parseInt(process.env.BCRYPT_SALT_ROUNDS),
      );

      // create user
      const userTag = `#${(
        Date.now().toString(36) + Math.random().toString(36).substring(2, 3)
      ).substring(0, 10)}`;
      const payload = {
        ...paramsUserInfo,
        userTag,
        password: hashedPassword,
      };
      const result: InsertResult = await this.userDao.createUser(payload);
      const response: IUserResponse = {
        status: true,
        code: 200,
        uuid: result.identifiers[0].uuid,
      };

      return response;
    } catch (error) {
      this.handleError(`createUser Error`, error);
    }
  }

  async updateUser(
    paramsUserInfo: UserPatchDto,
    uuid: string,
  ): Promise<IUserResponse> {
    try {
      await this.userDao.updateUser(paramsUserInfo, uuid);
      return {
        status: true,
        code: 200,
        uuid: uuid,
      };
    } catch (error) {
      this.handleError(`updateUser Error`, error);
    }
  }

  /** functions */
  checkPassword(password: string, passwordConfirm: string): boolean {
    return password.trim() === passwordConfirm.trim();
  }
}
