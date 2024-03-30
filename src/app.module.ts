import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { CouponModule } from './coupon/coupon.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
    UsersModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
    CouponModule,
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
