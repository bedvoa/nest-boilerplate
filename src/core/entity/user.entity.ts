import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { comment: '고유번호' })
  @ApiProperty({ name: 'id', description: '일련번호', example: '1' })
  uuid: string;

  @ApiProperty({ name: 'name', description: '유저명', example: '진정우' })
  @Column({
    name: 'name',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: false,
    default: '',
    comment: '유저명',
  })
  name: string;

  @ApiProperty({
    name: 'nickname',
    description: '닉네임',
    example: 'jungwoo',
  })
  @Column({
    name: 'nickname',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
    default: '',
    comment: '닉네임',
  })
  nickname: string;

  @ApiProperty({
    name: 'userId',
    description: '유저아이디',
    example: 'jungwoo',
  })
  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 20,
    nullable: false,
    unique: true,
    default: '',
    comment: '유저아이디',
  })
  userId: string;

  @ApiProperty({
    name: 'password',
    description: '패스워드',
    example: 'password',
  })
  @Column({
    name: 'password',
    type: 'varchar',
    length: 1000,
    nullable: false,
    unique: false,
    default: '',
    comment: '패스워드',
  })
  @Exclude()
  password: string;

  @ApiProperty({
    name: 'email',
    description: '이메일',
    example: 'test@test.com',
  })
  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: true,
    unique: true,
    default: '',
    comment: '이메일',
  })
  email: string;

  @ApiProperty({
    description: '탈퇴 여부',
    example: false,
  })
  @Column({
    name: 'status',
    type: 'boolean',
    default: false,
    comment: '탈퇴 여부',
  })
  status: boolean;

  @ApiProperty({
    name: 'userTag',
    description: '닉네임 중복 방지를 위한 유저 태그',
    example: '#345ddf34',
  })
  @Column({
    name: 'user_tag',
    type: 'varchar',
    length: 11,
    nullable: false,
    unique: true,
    default: '#none',
    comment: '닉네임 중복 방지를 위한 유저 태그',
  })
  private userTag: string;

  @ApiProperty({
    description: '마지막 로그인 일시',
    example: '2021-01-01 00:00:00',
  })
  @Column({
    name: 'last_login_at',
    nullable: true,
    type: 'datetime',
    comment: '마지막 로그인 일시',
  })
  lastLoginAt: Date;

  @ApiProperty({
    name: 'createdAt',
    description: '생성일',
    example: '2021-01-01 00:00:00',
  })
  @CreateDateColumn({ name: 'created_at', comment: '생성일' })
  createdAt: Date;

  @ApiProperty({
    name: 'updatedAt',
    description: '수정일',
    example: '2021-01-01 00:00:00',
  })
  @CreateDateColumn({ name: 'updated_at', comment: '수정일' })
  updatedAt: Date;
}
