import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from './model/group.model';
import { User } from 'src/users/modal/user.modal';

@Injectable()
export class GroupsService {
  constructor(
    @InjectModel(Group.name)
    private groupModel: Model<Group>,
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async createGroup(groupData: CreateGroupDto) {
    const user = await this.userModel.findOne({ _id: groupData.createdBy });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const group = await this.groupModel.create({
      ...groupData,
      groupState: 'active',
      category: groupData.category || 'default',
      transactionIds: [],
    });
    const userUpdates = groupData.members.map((member) => {
      return this.userModel.findOneAndUpdate(
        { _id: member },
        { $push: { groupIds: group._id } },
        { new: true },
      );
    });
    await Promise.all(userUpdates);
    return { data: group };
  }

  async getGroups(groupIds: string[]) {
    const groups = await this.groupModel.find({ _id: { $in: groupIds } });
    return { data: groups };
  }

  async getGroup(id: string) {
    const group = await this.groupModel.findOne({ _id: id });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return { data: group };
  }
}
