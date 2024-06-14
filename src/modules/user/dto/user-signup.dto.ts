import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserSignUpDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '이름',
    example: '홍길동',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '닉네임',
    example: 'test',
    required: true,
  })
  nickname: string;

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

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '이메일',
    example: 'test@test.com',
    required: true,
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '패스워드 확인',
    example: 'test1234',
    required: true,
  })
  passwordConfirm: string;
}
