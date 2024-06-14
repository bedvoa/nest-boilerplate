import { PartialType, PickType } from '@nestjs/swagger';
import { UserEntity } from 'src/core/entity/user.entity';

export class UserPatchDto extends PartialType(
  PickType(UserEntity, ['name', 'nickname', 'userId', 'email', 'password']),
) {}
