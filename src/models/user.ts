import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER"
  },
}, { versionKey: false });

export const User = model('User', UserSchema);

export type RoleType = "ADMIN" | "USER" | "MODERATOR";

export type UserType = {
  username: string;
  password: string;
  role: RoleType;
}
