import { IsBoolean, IsString } from 'class-validator';

export class ValidationDto {
  @IsString()
  uuid: string;

  @IsBoolean()
  refreshToken: boolean;

  @IsString()
  iat: string;

  @IsString()
  exp: string;
}
