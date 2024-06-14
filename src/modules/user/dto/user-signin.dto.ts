import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class UserSignInDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '아이디',
    example: 'test',
    required: true,
  })
  userId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '비밀번호',
    example: 'test1234',
    required: true,
  })
  password: string;
}
