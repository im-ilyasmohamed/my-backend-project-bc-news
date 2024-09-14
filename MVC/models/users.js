const db = require("../../db/connection");

// No param inpur
exports.fetchAllUsers = () => {
  // error handling

  // query
  let mrQuery = `
  SELECT
    *
  FROM 
    users
  `;

  // db query(query, [])
  return db
    .query(mrQuery)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      // only send correct status code
      // BUT DOES NOT SEND msg not sure why?
      return Promise.reject({
        status: 500,
        msg: "Internal Server Error: Database query failed",
      });
    });
};
