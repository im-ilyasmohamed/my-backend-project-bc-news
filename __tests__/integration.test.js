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
    test("200: returns 200", () => {
      //console.log("hello");
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((response) => {
          console.log(response.body.topics.rows)
          response.body.topics.rows.forEach(
            (topicItem) => {
              expect(topicItem).toHaveProperty("slug", expect.any(String));
              expect(topicItem).toHaveProperty("description", expect.any(String));
            }
          );
        });
    });
    test("200: returns array of objects with following properties ", () => {});
  });
});

// example of previous test I created
// test("200: returns an array of the treasure object", () => {
//     return request(app)
//       .get("/api/treasures")
//       .expect(200)
//       .then(({ body: { treasures } }) => {
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
