const db = require("../../db/connection");

// No param input
exports.fetchAllUsers = () => {
  // SQL injection prevention if any future functions were put here

  // SQL query
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
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No users found for this topic",
        });
      }
      return rows;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      // only send correct status code
      // BUT DOES NOT SEND msg not sure why?
      return Promise.reject({
        status: 500,
        msg: "Internal Server Error: Database query failed",
      });
    });
};
