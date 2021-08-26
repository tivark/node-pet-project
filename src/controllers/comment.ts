import { Request, Response } from "express";
import CommentsService from "../services/comments-service";

export class Comments {

  async create(req: Request, res: Response) {
    const {
      articleId,
      comment,
      authorId
    } = req.body;

    const createResult = await CommentsService.create(articleId, comment, authorId);

    res.status(200).json(createResult);
  }

  async getCommentsForArticle(req: Request, res: Response) {
    const { articleId } = req.params;
    const comments = await CommentsService.getCommentsForArticle(articleId);

    res.status(200).json(comments);
  }

  async getOne(req: Request, res: Response) {
    const { id } = req.params;
    const comment = await CommentsService.getOne(id);

    res.status(200).json(comment);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { text } = req.body;
    const updatedComment = await CommentsService.update(id, text);

    res.status(200).json(updatedComment);
  }

  async delete(req: Request, res: Response) {
      const { id } = req.params;
      const deleteResult = await CommentsService.delete(id);

      res.status(200).json(deleteResult);
  }
}
