import { UseGuards, applyDecorators } from '@nestjs/common';
import { UuidGuard } from 'src/common/decorators/uuid-match-user.decorator';

export function UuidMatchUser() {
  return applyDecorators(UseGuards(UuidGuard));
}
