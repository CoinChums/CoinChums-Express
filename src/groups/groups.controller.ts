import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get(':id')
  async getGroup(@Param('id') id: string) {
    return await this.groupsService.getGroup(id);
  }

  @Post('getGroups')
  async getGroups(@Body() groupIds: string[]) {
    return await this.groupsService.getGroups(groupIds);
  }

  @Post()
  async createGroup(@Body() groupData: CreateGroupDto) {
    return await this.groupsService.createGroup(groupData);
  }
}
