import { ConfigConstantValue } from 'src/constant/config.constant';
import { UserConstantValue } from 'src/constant/user.constant';
import { UserEntity } from 'src/core/entity/user.entity';
import { DataSource } from 'typeorm';

export const userRepository = [
  {
    provide: UserConstantValue.USER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserEntity),
    inject: [ConfigConstantValue.DATA_SOURCE],
  },
];
