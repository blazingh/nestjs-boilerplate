import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';

import AuthModule from '@components/auth/auth.module';
import UsersModule from '@components/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://mongodb:27017/app'),
    RedisModule.forRoot({
      config: {
        host: 'redis',
        port: 6379,
      },
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export default class AppModule { }
