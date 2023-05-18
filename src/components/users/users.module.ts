import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import UsersController from './users.controller';
import UsersService from './users.service';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export default class UsersModule { }
