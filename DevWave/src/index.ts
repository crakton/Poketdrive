import { Elysia } from "elysia";
import { Constants } from "./constants";
import { FOREM } from "./services/forem";
import { DATABASE } from "./services/database";
import { TRENDING_ARTICLE } from "./schemas/articles";
import { randomUUID } from "crypto";
import { AI } from "./services/ai";
import { OPEN_AI } from "./services/openai";
import { GENERATE_ARTICLE_BODY, SERVER_RESPONSE } from "./constants/types";

const app = new Elysia();

app.get("/", async () => {

  // const article = await foremArticles.then((res: any[]) => {
    // console.log("Trending on Forem", res[0]);

    // const _gemini_response = AI.writeWithGemini("GitHub CoPilot", ['javascript']);
    // return _gemini_response;

    // const _airesponse = AI.writeArticle("Introduction to Javascript", ['javascript']);
  
    // return _airesponse.then((res: any) => {
    //   console.log("AI: ", res);
    //   return res.generations[0][0].text
    // });

    // res.forEach(article => {
    //   console.log('Article', article);
    //   const data: TRENDING_ARTICLE = {
    //     id: randomUUID(),
    //     published_at: article.published_timestamp,
    //     title: article.title,
    //     url: article.url,
    //     image: article.image ? article.image : article.cover_image,
    //     providers: ['Forem'],
    //     author: {
    //       name: article.user.name,
    //       username: article.user.username,
    //       github: article.user.github_username,
    //       x: article.user.twitter_username
    //     },
    //     metrics: {
    //       likes: article.positive_reactions_count,
    //       comments: article.comments_count,
    //     },
        // tags: Array.from(new Set([
        //   // article.tags, 
        //   ...article.tag_list
        // ]))
    //   }
    //   const trendingArticlesRef = DATABASE.storeTrendingArticle(data);

    //   trendingArticlesRef.then((res) => {
    //     console.log('SAVED Article: ', article.id);
    //   }, (err: Error) => {
    //     console.error('Save Rejected: ' + err);
    //   }).catch((err: Error) => {
    //     console.error('Saving Error: ' + err.message);
      // })
    // });
  // });

  return `Welcome to ${Constants.APP_NAME}`;
});

app.group('/trends', (app) => 
  app

  // Get all trend article titles in the database
  .get('/all-titles', async ({ set }) => {
    const _databaseResponse: any = await DATABASE.getTrendingArticles();

    if (_databaseResponse) {
      const _apiResponse: SERVER_RESPONSE = {
        data: {
          articles: _databaseResponse
        },
        status: set
      }

      return _apiResponse;
    } else {
      const _errorResponse: SERVER_RESPONSE = {
        data: {},
        error: {
          message: 'Error Getting Trending Articles'
        },
        status: set,
      }

      return _errorResponse;
    }
  })
  
  // Get trending articles on Forem(dev.to)
  .get('/forem', async ({ set }) => {
    const foremArticles = await FOREM.getTopPosts({
      limit: 100
    });

    if (foremArticles) {
      let _apiResponse: SERVER_RESPONSE = {
        data: {
          articles: foremArticles
        },
        status: set
      }

      return _apiResponse;
    } else {
      let _errorResponse: SERVER_RESPONSE = {
        data: {},
        status: set
      };

      return _errorResponse;
    }
  })
)

// App routes for articles
app.group('/article', (app) => 
  app

  // Suggest 5 article titles from trending articles
  .post('/suggestions', async ({ body, set }) => {
    const requestBody: any = body;
    console.log('Body: ', requestBody);
    if (body) {
      const _suggestionsResponse = await AI.suggestArticles({
        trends: requestBody,
        limit: 5
      });

      const _apiResponse: SERVER_RESPONSE = {
        data: {
          suggestions: _suggestionsResponse
        },
        status: set
      }

      return _apiResponse;
    } else {
      let _errorResponse: SERVER_RESPONSE = {
        data: {},
        error: {
          message: "Request Body Invalid"
        },
        status: set
      };

      return _errorResponse;
    }
  })

  // Write an article with Gemini Pro
  .post('/write-gemini', async ({ body, set }) => {
    const requestBody: any = body;
    if (body) {
      const _geminiResponse = await AI.writeWithGemini(
        requestBody.title, 
        requestBody.keywords,
        requestBody.word_count
      );

      let _apiResponse: SERVER_RESPONSE = {
        data: {
          article: _geminiResponse,
          model: 'gemini-pro'
        },
        status: set
      }

      return _apiResponse;
    } else {
      let _errorResponse: SERVER_RESPONSE = {
        data: {},
        error: {
          message: "Request Body Invalid"
        },
        status: set
      };

      return _errorResponse;
    }
  })
)

// App routes to URLs
app.group('/url', (app) => 

  // Shorten URL
  app.post('/shorten', async ({ body, set }) => {
    const requestBody: any = body;
    if (body) {
      // const _shortenerResponse = await URL.shorten(requestBody.url);
      let _apiResponse: SERVER_RESPONSE = {
        data: {},
        error: {
          message: "Request Body Invalid"
        },
        status: set
      }

      return _apiResponse;
    }
  })
)

app.listen(3000);

console.log(
  `🦊 DevWave is running at ${app.server?.hostname}:${app.server?.port}`
);
