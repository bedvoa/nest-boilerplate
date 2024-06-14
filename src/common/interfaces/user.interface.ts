import { Request } from 'express';
import { UserEntity } from 'src/core/entity/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}
