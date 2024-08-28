const db = require("../db/connection"); // pool db to query
const seed = require("../db/seeds/seed"); // seed the database, drop, create etc
const data = require("../db/data/test-data"); // data to for seeding
const app = require("../app"); // request(app)
const request = require("supertest"); // http client, for connecting to the surver
beforeAll(() => {
  seed(data);
}); // before all seed the data for my test

describe("endpoints", () => {
  describe("GET /api/topics", () => {
    test("200: returns array of topic objects", () => {
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
    test.only("200: returns article object by article id param input", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          // check correct output
          expect(Array.isArray(body)).toBe(true);
          expect(body.length).toBe(1);

          // test each value name, and output type
          expect(body[0]).toHaveProperty("author", expect.any(String));
          expect(body[0]).toHaveProperty("title", expect.any(String));
          expect(body[0]).toHaveProperty("article_id", expect.any(Number));
          expect(body[0]).toHaveProperty("body", expect.any(String));
          expect(body[0]).toHaveProperty("topic", expect.any(String));
          expect(body[0]).toHaveProperty("created_at", expect.any(String));
          expect(body[0]).toHaveProperty("votes", expect.any(Number));
          expect(body[0]).toHaveProperty("article_img_url", expect.any(String));
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
