import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupSchema } from './model/group.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/modal/user.modal';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Group', schema: GroupSchema },
    ]),
  ],
  providers: [GroupsService],
  controllers: [GroupsController],
})
export class GroupsModule {}
