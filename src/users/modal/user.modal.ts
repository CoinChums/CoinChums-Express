import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    currentTime: () => Date.now(),
  },
  versionKey: false,
})
export class User {
  @Prop()
  userId: string;
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  deletedAt: Date | null;
  @Prop()
  encodedToken: string | null;
  @Prop()
  groupIds: Array<string>;
  @Prop()
  couponId: string | null;

  constructor(name: string, email: string, encodedToken: string) {
    this.name = name;
    this.email = email;
    this.password = '';
    this.deletedAt = null;
    this.encodedToken = encodedToken;
    this.groupIds = [];
    this.couponId = null;
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});
