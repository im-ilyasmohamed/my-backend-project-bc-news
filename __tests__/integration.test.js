const db = require("../db/connection"); // pool db to query
const seed = require("../db/seeds/seed"); // seed the database, drop, create etc
const data = require("../db/data/test-data"); // data to for seeding
const app = require("../app"); // request(app)
const request = require("supertest"); // http client, for connecting to the surver
const { forEach } = require("../db/data/test-data/articles");
const { expect } = require("@jest/globals");
const { toBeSorted } = require("jest-sorted"); // for the sorting queries, api point 11+
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
            expect(eachItem).toHaveProperty("article_id", expect.any(Number)); // instead of article ID
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

// tests could be improved, e.g. done at different ranges etc, also do 1000 case, and case where wrong article_id for example 600 iS placed
describe("Article Vote Increment", () => {
  test("200: Successfully increments an article's vote by 1000 and returns the updated article with correct properties", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({ inc_votes: 1000 })
      .expect(200)
      .then(({ body }) => {
        //console.log(body);
        //console.log(body.editecArticle[0], "body");
        expect(body.editecArticle[0]).toHaveProperty(
          "article_id",
          expect.any(Number)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "title",
          expect.any(String)
        );

        expect(body.editecArticle[0]).toHaveProperty(
          "topic",
          expect.any(String)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "author",
          expect.any(String)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "body",
          expect.any(String)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "created_at",
          expect.any(String)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "votes",
          expect.any(Number)
        );
        expect(body.editecArticle[0].votes).toBe(1100); // hardcoded, check if votes incremented by one
        expect(body.editecArticle[0]).toHaveProperty(
          "votes",
          expect.any(Number)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "article_img_url",
          expect.any(String)
        );
      });
  });
  test("200: Successfully decrement an article's vote by -100 and returns the updated article with correct properties, using a different article id to the first test", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({ inc_votes: -100 })
      .expect(200)
      .then(({ body }) => {
        expect(body.editecArticle[0]).toHaveProperty(
          "article_id",
          expect.any(Number)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "title",
          expect.any(String)
        );

        expect(body.editecArticle[0]).toHaveProperty(
          "topic",
          expect.any(String)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "author",
          expect.any(String)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "body",
          expect.any(String)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "created_at",
          expect.any(String)
        );
        expect(body.editecArticle[0]).toHaveProperty(
          "votes",
          expect.any(Number)
        );
        expect(body.editecArticle[0].votes).toBe(-100); // hardcoded, check if votes incremented by one
        expect(body.editecArticle[0]).toHaveProperty(
          "article_img_url",
          expect.any(String)
        );
      });
  });
  // test cases could be improved, more cases
  test("400: Unsuccesful increment of article due to passing in text rather than number", () => {
    return request(app)
      .patch("/api/articles/wronginput")
      .send({ inc_votes: 1000 })
      .expect(400)
      .then((body) => {
        //console.log(body);
        // wrong article
        // still works
      });
  });
});

describe("removeCommentByCommentId(), deleting comment by comment id", () => {
  test("204: Successfully delete existing comment, do not return anything", () => {
    return request(app)
      .delete("/api/comments/18")
      .expect(204)
      .then(({ body }) => {
        expect(body).toEqual({});
      });
  });
  test("404: UnSuccessfull delete non-existing comment, do not return anything", () => {
    return request(app)
      .delete("/api/comments/21")
      .expect(404)
      .then((res) => {
        //console.log("Here in body", );
        //expect(res).toHaveProperty("msg", "resource not found");

        // not sure why, only getting html response rather than body object
        expect(res.error.status).toEqual(404);
      });
  });
  test.only("404: UnSuccessfull inputing a word rather than a number, do not return anything", () => {
    return request(app)
      .delete("/api/comments/wronginput")
      .expect(404)
      .then((res) => {
        //console.log("Here in body", body);

        // not sure why, only getting html response rather than body object
        expect(res.error.status).toEqual(404);
      });
  });
});

// REQUIRES MORE TESTING
// REQUIRES MORE TESTING
// REQUIRES MORE TESTING
// REQUIRES MORE TESTING
describe("", () => {
  test("200 - okay", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        body.allUsers.forEach((userItem) => {
          expect(userItem).toHaveProperty("username", expect.any(String));
          expect(userItem).toHaveProperty("name", expect.any(String));
          expect(userItem).toHaveProperty("avatar_url", expect.any(String));
        });
      });
  });
});

// TEST COMPLETED - 8 CASES
describe("GET articles by sort_by and order", () => {
  test("200: Recieved articles based on query url, sorted by time created at and in ascending order", () => {
    // sort_by = created_at, order = asc
    return request(app)
      .get("/api/articles?sort_by=created_at&order=asc")
      .expect(200)
      .then(({ body }) => {
        // jest sorting function, ascending
        expect(body.allSortedArticles).toBeSorted((a, b) => {
          return new Date(a.created_at) - new Date(b.created_at);
        });

        // check if properties exist in object, within array
        body.allSortedArticles.forEach((articleItem) => {
          expect(articleItem).toHaveProperty("article_id", expect.any(Number));
          expect(articleItem).toHaveProperty("title", expect.any(String));
          expect(articleItem).toHaveProperty("topic", expect.any(String));
          expect(articleItem).toHaveProperty("author", expect.any(String));
          expect(articleItem).toHaveProperty("body", expect.any(String));
          expect(articleItem).toHaveProperty("created_at", expect.any(String));
          expect(articleItem).toHaveProperty("votes", expect.any(Number));
          expect(articleItem).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
          expect(articleItem).toHaveProperty(
            "comment_count",
            expect.any(String)
          );
        });
      });
  });
  test("200: Recieved articles based on query url, sorted by article id at and in desending order order", () => {
    // sort_by = created_at, order = asc
    return request(app)
      .get("/api/articles?sort_by=article_id&order=desc")
      .expect(200)
      .then(({ body }) => {
        // jest sorting function, descending
        expect(body.allSortedArticles).toBeSorted((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        body.allSortedArticles.forEach((articleItem) => {
          expect(articleItem).toHaveProperty("article_id", expect.any(Number));
          expect(articleItem).toHaveProperty("title", expect.any(String));
          expect(articleItem).toHaveProperty("topic", expect.any(String));
          expect(articleItem).toHaveProperty("author", expect.any(String));
          expect(articleItem).toHaveProperty("body", expect.any(String));
          expect(articleItem).toHaveProperty("created_at", expect.any(String));
          expect(articleItem).toHaveProperty("votes", expect.any(Number));
          expect(articleItem).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
          expect(articleItem).toHaveProperty(
            "comment_count",
            expect.any(String)
          );
        });
      });
  });
  test("200: Recieved articles based on query url, sorted by time created (by default) at and explicit descending order", () => {
    // default descending, explicit created at
    return request(app)
      .get("/api/articles?order=desc")
      .expect(200)
      .then(({ body }) => {
        // jest sorting function, ascending
        expect(body.allSortedArticles).toBeSorted((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        // check if properties exist in object, within array
        body.allSortedArticles.forEach((articleItem) => {
          expect(articleItem).toHaveProperty("article_id", expect.any(Number));
          expect(articleItem).toHaveProperty("title", expect.any(String));
          expect(articleItem).toHaveProperty("topic", expect.any(String));
          expect(articleItem).toHaveProperty("author", expect.any(String));
          expect(articleItem).toHaveProperty("body", expect.any(String));
          expect(articleItem).toHaveProperty("created_at", expect.any(String));
          expect(articleItem).toHaveProperty("votes", expect.any(Number));
          expect(articleItem).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
          expect(articleItem).toHaveProperty(
            "comment_count",
            expect.any(String)
          );
        });
      });
  });
  test("200: Recieved articles based on query url, sorted by time created at and defaults descending order", () => {
    // default descending, explicit created at
    return request(app)
      .get("/api/articles?sort_by=created_at")
      .expect(200)
      .then(({ body }) => {
        // jest sorting function, ascending
        expect(body.allSortedArticles).toBeSorted((a, b) => {
          return new Date(b.created_at) - new Date(a.created_at);
        });

        // check if properties exist in object, within array
        body.allSortedArticles.forEach((articleItem) => {
          expect(articleItem).toHaveProperty("article_id", expect.any(Number));
          expect(articleItem).toHaveProperty("title", expect.any(String));
          expect(articleItem).toHaveProperty("topic", expect.any(String));
          expect(articleItem).toHaveProperty("author", expect.any(String));
          expect(articleItem).toHaveProperty("body", expect.any(String));
          expect(articleItem).toHaveProperty("created_at", expect.any(String));
          expect(articleItem).toHaveProperty("votes", expect.any(Number));
          expect(articleItem).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
          expect(articleItem).toHaveProperty(
            "comment_count",
            expect.any(String)
          );
        });
      });
  });
  test("200: Recieved articles based on query url, sorted by votes and defaults descending order", () => {
    // default descending, explicit created at
    return request(app)
      .get("/api/articles?sort_by=votes")
      .expect(200)
      .then(({ body }) => {
        // jest sorting function, ascending
        expect(body.allSortedArticles).toBeSortedBy("votes", {
          descending: true,
        });
        // check if properties exist in object, within array
        body.allSortedArticles.forEach((articleItem) => {
          expect(articleItem).toHaveProperty("article_id", expect.any(Number));
          expect(articleItem).toHaveProperty("title", expect.any(String));
          expect(articleItem).toHaveProperty("topic", expect.any(String));
          expect(articleItem).toHaveProperty("author", expect.any(String));
          expect(articleItem).toHaveProperty("body", expect.any(String));
          expect(articleItem).toHaveProperty("created_at", expect.any(String));
          expect(articleItem).toHaveProperty("votes", expect.any(Number));
          expect(articleItem).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
          expect(articleItem).toHaveProperty(
            "comment_count",
            expect.any(String)
          );
        });
      });
  });
  test("200: Recieved articles based on query url, sorted by votes and defaults descending order", () => {
    // default descending, explicit created at
    return request(app)
      .get("/api/articles?sort_by=author")
      .expect(200)
      .then(({ body }) => {
        // jest sorting function, ascending
        expect(body.allSortedArticles).toBeSortedBy("author", {
          descending: true,
        });
        // check if properties exist in object, within array
        body.allSortedArticles.forEach((articleItem) => {
          expect(articleItem).toHaveProperty("article_id", expect.any(Number));
          expect(articleItem).toHaveProperty("title", expect.any(String));
          expect(articleItem).toHaveProperty("topic", expect.any(String));
          expect(articleItem).toHaveProperty("author", expect.any(String));
          expect(articleItem).toHaveProperty("body", expect.any(String));
          expect(articleItem).toHaveProperty("created_at", expect.any(String));
          expect(articleItem).toHaveProperty("votes", expect.any(Number));
          expect(articleItem).toHaveProperty(
            "article_img_url",
            expect.any(String)
          );
          expect(articleItem).toHaveProperty(
            "comment_count",
            expect.any(String)
          );
        });
      });
  });
  test("400: Request bad as author spelt wrong, prevents SQL injection as only set amount of inputs permitted", () => {
    // default descending, explicit created at
    return request(app)
      .get("/api/articles?sort_by=autho")
      .expect(400)
      .then(({ body }) => {
        // expect 400 for wrong input
      });
  });
  test("400: Request bad as desc spelt wrong, prevents SQL injection as only set amount of inputs permitted", () => {
    // default descending, explicit created at
    return request(app)
      .get("/api/articles?sort_by=author&order=des")
      .expect(400)
      .then(({ body }) => {
        // expect 400 for wrong input
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
