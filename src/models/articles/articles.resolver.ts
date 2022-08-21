import {
  Arg, Args, Mutation, Query, Resolver,
} from 'type-graphql';
import IArticle from './types/article.types';
import ArticlesService from './articles.service';
import IArticlePayload from './types/articlePayload.args';

@Resolver(() => IArticle)
export default class BetResolver {
  // ** CREATE
  @Mutation(() => IArticle)
  async createArticle(@Args() payload: IArticlePayload): Promise<IArticle> {
    return ArticlesService().createArticle(payload);
  }

  // ** UPDATE
  @Mutation(() => IArticle)
  async updateArticle(@Arg('payload') payload: IArticlePayload, @Arg('id') id: string): Promise<IArticle> {
    return ArticlesService().updateArticle(payload, id);
  }

  // ** READ
  @Query(() => [IArticle])
  async getAllArticles(): Promise<IArticle[]> {
    return ArticlesService().allArticles();
  }

  @Query(() => IArticle)
  async getArticleByID(
    @Arg('id') id: string,
  ): Promise<IArticle> {
    return ArticlesService().findArticleById(id);
  }

  // ** DELETE
  @Mutation(() => IArticle)
  async deleteArticleById(
    @Arg('id') id: string,
  ): Promise<IArticle> {
    return ArticlesService().deleteArticleById(id);
  }
}
