import { Comment } from "../models/comment";
import { Request, Response } from "express";
import { NotFoundError } from "../errors/not-found";
import { errorHandler } from "../services/global-error-handler";

export class Comments {

  async create(req: Request, res: Response) {
    try {
      const {
        articleId,
        comment,
        authorId
      } = req.body;

      const date = new Date();

      const newComment = new Comment({
        articleId,
        comment,
        authorId,
        date: date.toLocaleString()
      });

      await newComment.save();
      return res.status(200).json({ status: "OK" });

    } catch (e) {
      console.log(e.message);
      res.status(400).json({ message: "Ошибка при создании комментария" })
    }
  }

  async getMany(req: Request, res: Response) {
    try {
      const { articleId } = req.query;

      const comments = await Comment.find({ articleId });

      res.status(200).json(comments);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Ошибка при получении комментариев" });
    }
  }

  async getOne(req: Request, res: Response) {
    // try {
      const { id } = req.params;

      const comment = await Comment.findById(id);

      if(!comment){
        throw new NotFoundError();
      }

      res.status(200).json(comment);
    // } catch (e) {
    //   console.log(e);
    //   res.status(400).json({ message: "Ошибка при получении комментариев" });
    // }
  }

  async update(req: Request, res: Response){
    try{
      const { id } = req.params;
      const { text } = req.body;

      const existComment = await Comment.findByIdAndUpdate(id, {comment: text});

      if(!existComment){
        return res.sendStatus(404);
      }
      console.log(existComment)

      res.status(200).json({message: "OK"});

    } catch (e){
      console.log(e);
      res.status(400).json({message: "Ошибка при обновлении"});
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await Comment.deleteOne({ _id: id });

      if (!result.deletedCount) {
        return res.status(404).json({ message: "Комментарий не найден" });
      }

      res.status(200).json({ message: "OK" });
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: "Ошибка при удалении" });
    }
  }
}