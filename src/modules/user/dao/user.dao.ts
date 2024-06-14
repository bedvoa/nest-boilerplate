import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { UserConstantValue } from 'src/constant/user.constant';
import { UserEntity } from 'src/core/entity/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { ServerErrorConstant } from 'src/constant/response.constant';
import { UserPatchDto } from '../dto/user-patch.dto';

@Injectable()
export class UserDao {
  logger = new Logger('UserDao');

  constructor(
    @Inject(UserConstantValue.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  /** Error handling method */
  private handleError(message: string, error: Error) {
    this.logger.error(error);
    throw new InternalServerErrorException(
      message,
      ServerErrorConstant.DB_QUERY_ERROR,
    );
  }

  /** query for API */
  async createUser(user: UserSignUpDto): Promise<InsertResult> {
    try {
      const newUser = this.userRepository.create({
        ...user,
        status: true,
      });
      const users: InsertResult = await this.userRepository
        .createQueryBuilder(UserConstantValue.USER_ENTITY)
        .insert()
        .into(UserEntity)
        .values(newUser)
        .execute();

      return users;
    } catch (error) {
      this.handleError('createUser Error', error);
    }
  }

  async updateUser(
    paramsUserInfo: UserPatchDto,
    uuid: string,
  ): Promise<boolean> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    try {
      /** start transaction */
      await queryRunner.connect();
      await queryRunner.startTransaction();
      const user = await this.userRepository.findOne({
        where: { uuid: paramsUserInfo.uuid },
      });

      if (!user) {
        throw new InternalServerErrorException(
          'updateUser Error',
          ServerErrorConstant.NO_USER,
        );
      }

      await this.userRepository
        .createQueryBuilder(UserConstantValue.USER_ENTITY)
        .update(UserEntity)
        .set({ ...paramsUserInfo })
        .where('uuid = :uuid', { uuid })
        .execute();

      /** commit transaction */
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      /** rollback transaction */
      await queryRunner.rollbackTransaction();
      this.handleError('updateUser Error', error);
    } finally {
      /** release queryRunner */
      await queryRunner.release();
    }
  }

  /** query for functions */
  async getUserInfoByUserId(
    data: Pick<UserEntity, 'userId'>,
  ): Promise<UserEntity> {
    try {
      const result = await this.userRepository.findOne({
        where: { userId: data.userId },
      });

      return result;
    } catch (error) {
      this.handleError('createUser Error', error);
    }
  }

  async getUserInfoByUserEmail(
    data: Pick<UserEntity, 'email'>,
  ): Promise<UserEntity> {
    try {
      const result = await this.userRepository.findOne({
        where: { email: data.email },
      });

      return result;
    } catch (error) {
      this.handleError('createUser Error', error);
    }
  }

  async getUserInfoByUserNickname(
    data: Pick<UserEntity, 'nickname'>,
  ): Promise<UserEntity> {
    try {
      const result = await this.userRepository.findOne({
        where: { nickname: data.nickname },
      });

      return result;
    } catch (error) {
      this.handleError('createUser Error', error);
    }
  }

  async getUserInfoByUuid(data: Pick<UserEntity, 'uuid'>): Promise<UserEntity> {
    try {
      const result = await this.userRepository.findOne({
        where: { uuid: data.uuid },
      });

      return result;
    } catch (error) {
      this.handleError('createUser Error', error);
    }
  }
}
