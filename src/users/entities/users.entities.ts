export type UserEntity = {
  userId: string;
  name: string;
  email: string;
  encodedToken: string;
  GroupIds: string[];
  couponId: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
};
