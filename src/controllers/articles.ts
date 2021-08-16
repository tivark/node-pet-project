import {Request, Response} from "express";
import { Article } from "../models/article";

export class Articles {

  async getAll(req: Request, res: Response) {
    try {
      const articles = await Article.find({});
      res.status(200).send(articles);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Something went wrong with receiving active articles' })
    }
  };

  async getActive(req: Request, res: Response) {
    try {
      const articles = await Article.find({ active: true });
      res.status(200).send(articles);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Something went wrong with receiving active articles' })
    }
  };

  async getInactive(req: Request, res: Response) {
    try {
      const articles = await Article.find({ active: false });

      res.status(200).json(articles);
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Something went wrong with receiving inactive articles' })
    }
  };

  async getOne(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const article = await Article.findOne({ _id: id });

      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json(article);

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Something went wrong with getting article' })
    }
  };

  async create(req: Request, res: Response) {
    try {
      const {
        title,
        text,
        author
      } = req.body;

      const date = new Date();

      const newArticle = new Article({
        title,
        text,
        author,
        date: date.toLocaleString()
      });

      await newArticle.save();

      return res.status(200).json();
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Create article error" });
    }
  };

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.query;
      const result = await Article.deleteOne({ _id: id });

      if (!result.deletedCount) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json({message: "OK"});

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: 'Something went wrong with getting article' })
    }
  };
}