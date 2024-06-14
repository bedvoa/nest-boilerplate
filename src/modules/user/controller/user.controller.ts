import UserSignInDto from '../dto/user-signin.dto';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserSignUpDto } from '../dto/user-signup.dto';
import { UserService } from '../service/user.service';
import { IUserResponse } from '../dto/user-response.dto';
import { AuthService } from 'src/modules/auth/service/auth.service';
import { IAuthResponseDto } from 'src/modules/auth/dto/response.dto';
import { JwtAuthGuard } from 'src/modules/auth/guard/jwt-auth.guard';
import { UuidMatchUser } from 'src/modules/auth/guard/uuid.guard';
import { RequestWithUser } from 'src/common/interfaces/user.interface';
import { UserPatchDto } from '../dto/user-patch.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Create - signup
   * Read - signin, my info
   * Update - update
   * Delete - delete
   */

  // Create -signup
  @Post('signup')
  async signUp(@Body() paramsUserInfo: UserSignUpDto): Promise<IUserResponse> {
    return await this.userService.createUser(paramsUserInfo);
  }

  // Read -signin
  @Post('auth/signin')
  async SignIn(
    @Body() paramsUserInfo: UserSignInDto,
  ): Promise<IAuthResponseDto> {
    return await this.authService.jwtSignin(paramsUserInfo);
  }

  // Read - my info
  @Get('/:uuid')
  @UuidMatchUser()
  @UseGuards(JwtAuthGuard)
  async getMyInfo(@Request() req: any) {
    return await req.user;
  }

  @Patch('/:uuid')
  @UuidMatchUser()
  @UseGuards(JwtAuthGuard)
  async updateMyInfo(
    @Body() paramsUserInfo: UserPatchDto,
    @Param('uuid') uuid: string,
  ) {
    return await this.userService.updateUser(paramsUserInfo, uuid);
  }
}
