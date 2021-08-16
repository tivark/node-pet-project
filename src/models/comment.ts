import { Schema, model } from "mongoose";

const CommentSchema = new Schema({
  articleId: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
}, { versionKey: false });

export const Comment = model("Comment", CommentSchema);
