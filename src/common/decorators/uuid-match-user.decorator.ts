import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class UuidGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const paramsUuid = request.params.uuid;
    const userUuid = request.user.uuid;

    if (paramsUuid !== userUuid) {
      throw new UnauthorizedException('Invalid User');
    }

    return true;
  }
}
