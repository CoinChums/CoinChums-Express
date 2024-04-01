import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type GroupDocument = HydratedDocument<Group>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => Date.now(),
  },
  versionKey: false,
})
export class Group {
  @Prop()
  groupId: string;
  @Prop()
  createdBy: string;
  @Prop()
  category: string;
  @Prop()
  groupState: string;
  @Prop()
  members: Array<string>;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  transactionIds: Array<string>;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
