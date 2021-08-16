import { Schema, model } from "mongoose";

const ArticleScheme = new Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    required: true,
    default: false
  },
  date: {
    type: String,
    required: true
  }
}, { versionKey: false });

export const Article = model('Article', ArticleScheme);
