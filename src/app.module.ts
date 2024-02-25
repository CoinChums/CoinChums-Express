import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { GroupsModule } from './groups/groups.module';

@Module({
  imports: [AuthModule, TransactionModule, GroupsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
