import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
<<<<<<< Updated upstream
=======
import { UsersModule } from './users/users.module';
import { CouponModule } from './coupon/coupon.module';
>>>>>>> Stashed changes

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
<<<<<<< Updated upstream
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URI),
    UserModule,
=======
    MongooseModule.forRoot(process.env.MONGO_CONNECTION_URL),
    CouponModule,
>>>>>>> Stashed changes
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
