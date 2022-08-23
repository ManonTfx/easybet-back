import { ApolloServer, gql } from 'apollo-server-express';
import { prisma } from '../../utils/prisma';
// import createApolloServer from '../../apolloServer';

let server: ApolloServer;

let id: string;
let isDeleted: boolean;

beforeAll(async () => {
  // server = await createApolloServer();
});

describe('Articles Resolver', () => {
  // * CREATE ARTICLES TEST
  it('should create a new article', async () => {
    const addArticleMutation = gql`
     mutation createArticle(
        $category: String!,
        $title: String!,
        $contents: String!,
        $img: String!,
        $userId: String!
        ) {
          createArticle(
          category: $category,
          title: $title,
          contents: $contents,
          img: $img,
          userId: $userId) {
            id
            category
            title
            date
            contents
            img
            userId
        }
    }
`;

    const variables = {
      category: 'Football',
      title: 'Hello World',
      contents: 'Hello World',
      img: 'test.jpg',
      userId: id,
    };

    const response = await server.executeOperation({
      query: addArticleMutation,
      variables,
    });

    id = response.data?.createArticle.id;
    expect(response.data?.createArticle.id).toEqual(id);
    expect(response.data?.createArticle).toHaveProperty('title', variables.title);
    expect(response.data?.createArticle).toHaveProperty('category', variables.category);
    expect(response.data?.createArticle).toHaveProperty('contents', variables.contents);
    expect(response.data?.createArticle).toHaveProperty('img', variables.img);
    expect(response.data?.createArticle).toHaveProperty('userId', variables.userId);
  });

  // * GET ALL ARTICLES TEST
  it('should get all articles', async () => {
    const query = gql`
    query GetListArticles {
    getAllArticles {
      id
      category
      title
      date
      contents
      img
      userId
    }
  }
    `;
    const response = await server.executeOperation({ query });

    expect(Array.isArray(response.data?.GetListArticles)).toBe(true);
  });

  // * GET ONE ARTICLE TEST
  it('should get one article', async () => {
    const oneArticleQuery = gql`
    query GetOneArticle($getArticleByIdId: String!) {
    getArticleByID(id: $getArticleByIdId) {
      id
      category
      title
      date
      contents
      img
      userId
    }
  }
    `;

    const variables = {
      getArticleByIdId: id,
    };
    const response = await server.executeOperation({
      query: oneArticleQuery,
      variables,
    });

    const articleResponse = {
      id,
      category: 'Football',
      title: 'Hello World',
      date: '1612731879573',
      contents: 'Hello World',
      img: 'test.jpg',
      userId: id,
    };

    expect(response.data?.getArticleByIdId).toHaveProperty('id', id);
    expect(response.data?.getArticleByIdId).toHaveProperty('category', articleResponse.category);
    expect(response.data?.getArticleByIdId).toHaveProperty('title', articleResponse.title);
    expect(response.data?.getArticleByIdId).toHaveProperty('date', articleResponse.date);
    expect(response.data?.getArticleByIdId).toHaveProperty('contents', articleResponse.contents);
    expect(response.data?.getArticleByIdId).toHaveProperty('img', articleResponse.img);
    expect(response.data?.getArticleByIdId).toHaveProperty('userId', articleResponse.userId);
  });

  //   // * UPDATE ONE ARTICLE TEST
  //   it('should update the created project', async () => {
  //     const updateProjectMutation = gql`
  //     mutation Mutation(
  // $updateProjectId: String!,
  //   $status: String!,
  //   $startDate: String!,
  //   $endDate: String!,
  //   $estimeeSpentTime: Float!
  //   ) {
  //         updateProject(
  // id: $updateProjectId,
  // status: $status,
  // startDate: $startDate,
  // endDate: $endDate,
  // estimeeSpentTime: $estimeeSpentTime) {
  //           id
  //           status
  //           startDate
  //           endDate
  //           estimeeSpentTime
  //         }
  //       }
  //       `;
  //     const variables = {
  //       updateProjectId: id,
  //       status: 'DONE',
  //       startDate: '2021-02-07T21:04:39.573Z',
  //       endDate: '2021-02-07T21:04:39.573Z',
  //       estimeeSpentTime: 6.3,
  //     };

  //     const response = await server.executeOperation({
  //       query: updateProjectMutation,
  //       variables,
  //     });

  //     expect(response.data?.updateProject).toHaveProperty('status', variables.status);
  //     expect(response.data?.updateProject).toHaveProperty('startDate', '1612731879573');
  //     expect(response.data?.updateProject).toHaveProperty('endDate', '1612731879573');
  //   });

  //   // * DELETE ONE PROJECT TEST
  //   it('should delete the created project', async () => {
  //     const deleteProjectById = gql`
  //     mutation Mutation($deleteProjectByIdId: String!) {
  //         deleteProjectById(id: $deleteProjectByIdId) {
  //           id
  //         }
  //       }
  //     `;

  //     const variables = {
  //       deleteProjectByIdId: id,
  //     };

  //     const response = await server.executeOperation({
  //       query: deleteProjectById,
  //       variables,
  //     });

  //     if (response.data?.deleteProjectById.id) {
  //       isDeleted = false;
  //     }
  //     expect(isDeleted).toEqual(false);
  //   });

  afterAll(async () => {
    if (isDeleted) {
      await prisma.articles.delete({
        where: { id },
      });
    }
    await prisma.$disconnect();
  });
});
