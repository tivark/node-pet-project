import { Article } from "../models/article";
import { ApiErrors } from "../errors/api-errors";

class ArticlesService {
  async getAll() {
    const articles = await Article.find({});
    return articles;
  };

  async getActive() {
    const articles = await Article.find({ active: true });
    return articles;
  };

  async getInactive() {
    const articles = await Article.find({ active: false });
    return articles;
  };

  async getOne(id: string) {
    const article = await Article.findById(id);

    if (!article) {
      throw ApiErrors.notFound();
    }

    return article;
  };

  async create( title, text, author ) {
    const date = new Date();
    const newArticle = new Article({
      title,
      text,
      author,
      date: date.toLocaleString()
    });

    const result = await newArticle.save();

    return result;
  };

  async delete(id: string) {
    const result = await Article.deleteOne({ _id: id });

    if (!result.deletedCount) {
      throw ApiErrors.notFound();
    }

    return result;
  };
}

export default new ArticlesService();
