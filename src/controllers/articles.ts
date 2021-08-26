import { Request, Response } from "express";
import ArticlesService from "../services/articles-service";
import { ApiErrors } from "../errors/api-errors";

export class Articles {

  async getAll(req: Request, res: Response) {
    const articles = await ArticlesService.getAll();
    res.status(200).send(articles);
  };

  async getActive(req: Request, res: Response) {
    const articles = await ArticlesService.getActive();
    res.status(200).send(articles);
  };

  async getInactive(req: Request, res: Response) {
    const articles = await ArticlesService.getInactive();
    res.status(200).json(articles);
  };

  async getOne(req: Request, res: Response) {
    const { id } = req.query;
    const article = await ArticlesService.getOne(id as string);

    if (!article) {
      throw ApiErrors.notFound();
    }

    res.status(200).json(article);
  };

  async create(req: Request, res: Response) {
    const {
      title,
      text,
      author
    } = req.body;

    const saveResult = await ArticlesService.create(title, text, author);

    return res.status(200).json(saveResult);
  };

  async delete(req: Request, res: Response) {
    const { id } = req.query;
    const deleteResult = await ArticlesService.delete(id as string);

    res.status(200).json(deleteResult);
  };
}
