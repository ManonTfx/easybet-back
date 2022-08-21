import {
  Prisma,
} from '@prisma/client';

import { prisma } from '../../../utils/prisma';
import IArticle from '../types/article.types';
import IArticlePayload from '../types/articlePayload.args';
import IUpdateArticlePayload from '../types/articleUpdatePayload.args';

export default function ArticlePrismaDto() {
  // ** READ ALL
  async function getAllArticles(): Promise<IArticle[]> {
    return prisma.articles.findMany({
      orderBy: {
        date: 'asc',
      },
    });
  }

  // ** READ ONE
  async function oneArticleById(
    id: Prisma.ArticlesWhereUniqueInput,
  ): Promise<IArticle | null> {
    return prisma.articles.findUnique({
      where: id,
    });
  }

  // ** DELETE
  async function deleteOneArticleById(
    id: Prisma.ArticlesWhereUniqueInput,
  ) {
    return prisma.articles.delete({
      where: id,
    });
  }

  // ** CREATE
  async function createArticle(payload: IArticlePayload): Promise<IArticle | null > {
    return prisma.articles.create({
      data: {
        ...payload,
      },
    });
  }

  // ** UPDATE
  // eslint-disable-next-line max-len
  async function updateArticle(payload: IUpdateArticlePayload, id : Prisma.ArticlesWhereUniqueInput):
  Promise<IArticle | null > {
    return prisma.articles.update({
      where: id,
      data: {
        ...payload,
      },
    });
  }

  return {
    getAllArticles,
    oneArticleById,
    deleteOneArticleById,
    createArticle,
    updateArticle,
  };
}
