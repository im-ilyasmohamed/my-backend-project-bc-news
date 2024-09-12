const db = require("../db/connection"); // pool db to query
const seed = require("../db/seeds/seed"); // seed the database, drop, create etc
const data = require("../db/data/test-data"); // data to for seeding
const app = require("../app"); // request(app)
const request = require("supertest"); // http client, for connecting to the surver
const { forEach } = require("../db/data/test-data/articles");
const { expect } = require("@jest/globals");
beforeAll(() => {
  return seed(data);
}); // before all seed the data for my test
afterAll(() => {
  return db.end();
}); // close db that was created in model
describe("endpoints", () => {
  describe("GET /api/topics", () => {
    test("200: returns array of all topic objects", () => {
      //console.log("hello");
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          // console.log(response.body.topics.rows);
          response.body.topics.rows.forEach((topicItem) => {
            expect(topicItem).toHaveProperty("slug", expect.any(String));
            expect(topicItem).toHaveProperty("description", expect.any(String));
          });
        });
    });
    test("200: returns article object by article article id param", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const mySingleArticle = body.articleItem;
          // check correct output
          //console.log(mySingleArticle);
          expect(Array.isArray(mySingleArticle)).toBe(true);
          expect(mySingleArticle.length).toBe(1);

          // test each value name, and output type
          expect(mySingleArticle[0]).toHaveProperty(
            "author",
            expect.any(String)
          );
          expect(mySingleArticle[0]).toHaveProperty(
            "title",
            expect.any(String)
          );
          expect(mySingleArticle[0]).toHaveProperty(
            "article_id",
            expect.any(Number)
          );
          expect(mySingleArticle[0]).toHaveProperty("body", expect.any(String));
          expect(mySingleArticle[0]).toHaveProperty(
            "topic",
            expect.any(String)
          );
          expect(mySingleArticle[0]).toHaveProperty(
            "created_at",
            expect.any(String)
          );
          expect(mySingleArticle[0]).toHaveProperty(
            "votes",
            expect.any(Number)
          );
          expect(mySingleArticle[0]).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
        });
    });
    test("200: returns an array of comments for specific article based on id param input", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          body.allArticles.forEach((eachItem) => {
            // test each value name, and output type
            expect(eachItem).toHaveProperty("author", expect.any(String));
            expect(eachItem).toHaveProperty("title", expect.any(String));
            expect(eachItem).toHaveProperty("?column?", expect.any(Number)); // instead of article ID
            expect(eachItem).toHaveProperty("body", expect.any(String));
            expect(eachItem).toHaveProperty("topic", expect.any(String));
            expect(eachItem).toHaveProperty("created_at", expect.any(String));
            expect(eachItem).toHaveProperty("votes", expect.any(Number));
            expect(eachItem).toHaveProperty(
              "article_img_url",
              expect.any(String)
            );
            expect(eachItem).toHaveProperty(
              "comment_count",
              expect.any(String)
            ); // count number is returned as string, so should work
          });
        });
    });
    test("200: returns an array of comments for specific article based on id param input", () => {
      return request(app)
        .get("/api/articles/1/comments")
        .expect(200)
        .then(({ body }) => {
          body.commentItem.forEach((eachItem) => {
            expect(eachItem).toHaveProperty("comment_id", expect.any(Number));
            expect(eachItem).toHaveProperty("votes", expect.any(Number));
            expect(eachItem).toHaveProperty("created_at", expect.any(String));
            expect(eachItem).toHaveProperty("author", expect.any(String));
            expect(eachItem).toHaveProperty("body", expect.any(String));
            expect(eachItem).toHaveProperty("article_id", expect.any(Number));
          });
        });
    });
    test("201: post a comment ", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "rogersop", body: "this is the comment" })
        .expect(201)
        .then(({ body }) => {
          // post comment

          expect(body.pushedComment).toHaveProperty(
            "comment_id",
            expect.any(Number)
          );
          expect(body.pushedComment).toHaveProperty("body", expect.any(String));
          expect(body.pushedComment).toHaveProperty(
            "article_id",
            expect.any(Number)
          );
          expect(body.pushedComment).toHaveProperty(
            "author",
            expect.any(String)
          );
          expect(body.pushedComment).toHaveProperty(
            "votes",
            expect.any(Number)
          );
          expect(body.pushedComment).toHaveProperty(
            "created_at",
            expect.any(String)
          );
        });
    });
  });
});

describe("endpoints file ", () => {
  test("Should return a JSON object containing all available endpoints", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((response) => {
        // method 1
        // console.log(response.body); // will print endpoint.json file
        expect(response.body).toHaveProperty("GET /api");
        expect(response.body).toHaveProperty("GET /api/topics");
        expect(response.body).toHaveProperty("GET /api/articles");
        // method 2, optional, Object.keys(response.body).forEach( expect(thisItem).toHaveProperty
        // response.body.forEach((item) => {
        // used more when we want any item
        //   expect(item).toHaveProperty("GET /api", expect.any(String));
        //   expect(item).toHaveProperty("GET /api/topics"), expect.any(String);
        //   expect(item).toHaveProperty("GET /api/articles", expect.any(String));
        // });
      });
  });
});

// example of previous test I created
// test("200: returns an array of the treasure object", () => {
//     return request(app)
//       .get("/api/treasures")
//       .expect(200)
//       .then(( { body: { treasures } } ) => {
//         expect(treasures[0]).toEqual(
//           expect.objectContaining({
//             treasure_name: expect.any(String),
//             colour: expect.any(String),
//             age: expect.any(Number),
//             shop_name: expect.any(String),
//             treasure_id: expect.any(Number),
//           })
//         );
//       });
//   });
