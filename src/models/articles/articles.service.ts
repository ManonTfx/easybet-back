import ArticlePrismaDto from './dto/articlesDto.prisma';
import IArticle from './types/article.types';
import IArticlePayload from './types/articlePayload.args';
import IUpdateArticlePayload from './types/articleUpdatePayload.args';

export default function ArticlesService() {
  // ** CREATE
  async function createArticle(payload: IArticlePayload): Promise<IArticle> {
    const article = await ArticlePrismaDto().createArticle(payload);
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  }
  // ** UPDATE
  async function updateArticle(payload: IUpdateArticlePayload, id: string): Promise<IArticle> {
    const article = await ArticlePrismaDto().updateArticle(payload, { id });
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  }
  // ** READ
  async function allArticles(): Promise<IArticle[]> {
    const article = await ArticlePrismaDto().getAllArticles();
    if (!article) {
      throw new Error('No Articles found');
    }
    return article;
  }

  async function findArticleById(id: string): Promise<IArticle> {
    const article = await ArticlePrismaDto().oneArticleById({ id });
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  }

  // ** DELETE
  async function deleteArticleById(id: string): Promise<IArticle> {
    const article = await ArticlePrismaDto().deleteOneArticleById({ id });
    if (!article) {
      throw new Error('Article not found');
    }
    return article;
  }

  return {
    createArticle,
    updateArticle,
    allArticles,
    findArticleById,
    deleteArticleById,
  };
}
