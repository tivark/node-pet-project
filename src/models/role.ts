import {Schema, model} from "mongoose";

const RoleSchema = new Schema({
  value:{type: String, unique: true, default:"USER"}
},{ versionKey: false });


export const Role = model('Role', RoleSchema);