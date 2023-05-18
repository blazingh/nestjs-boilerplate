import {
  Controller,
  Get,
  NotFoundException,
  Param,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import JwtAuthGuard from '@guards/jwtAuth.guard';
import ParseObjectIdPipe from '@pipes/parseObjectId.pipe';
import UsersService from './users.service';
import { User } from './schema/user.schema';
import * as mongoose from 'mongoose';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOkResponse({
    type: User,
    description: '200. Success. Returns a user',
  })
  @ApiNotFoundResponse({
    description: '404. NotFoundException. User was not found',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getById(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<User | never> {
    const foundUser = await this.usersService.getById(
      new mongoose.Schema.Types.ObjectId(id),
    );
    if (!foundUser) {
      throw new NotFoundException('The user does not exist');
    }

    return foundUser;
  }

  @ApiOkResponse({
    type: [User],
    description: '200. Success. Returns all users',
  })
  @ApiUnauthorizedResponse({
    description: '401. UnauthorizedException.',
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllVerifiedUsers(): Promise<User[] | []> {
    const foundUsers = await this.usersService.getAll(true);

    return foundUsers;
  }
}
