import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
  userId: number;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  deletedAt: Date | null;
  @Prop()
  encodedToken: string | null;
  @Prop()
  groupIds: Array<number>;
  @Prop()
  couponId: string | null;

  constructor(name: string, email: string, password: string) {
    this.username = name;
    this.email = email;
    this.password = '';
    this.deletedAt = null;
    this.encodedToken = password;
    this.groupIds = [];
    this.password = password;
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
