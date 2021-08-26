import { Comment } from "../models/comment";
import { Article } from "../models/article";
import { ApiErrors } from "../errors/api-errors";

class CommentsService {

  async create(
    articleId: string,
    comment: string,
    authorId: string
  ) {
    const date = new Date();
    const newComment = new Comment({
      articleId,
      comment,
      authorId,
      date: date.toLocaleString()
    });

    const saveResult = await newComment.save();
    return saveResult;
  }

  async getCommentsForArticle(articleId: string) {
    const article = await Article.findById(articleId);

    if (!article) {
      throw ApiErrors.notFound();
    }

    const comments = await Comment.find({ articleId });
    return comments;
  }

  async getOne(id: string) {
    const comment = await Comment.findById(id);

    if (!comment) {
      throw ApiErrors.notFound();
    }

    return comment;
  }

  async update(id: string, text: string) {
    const updatedComment = await Comment.findByIdAndUpdate(id, { comment: text });

    if (!updatedComment) {
      throw ApiErrors.notFound();
    }

    return updatedComment;
  }

  async delete(id: string) {
    const deleteResult = await Comment.deleteOne({ _id: id });

    if (!deleteResult.deletedCount) {
      throw ApiErrors.notFound();
    }

    return deleteResult;
  }
}

export default new CommentsService();
