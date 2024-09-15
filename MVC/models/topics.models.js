const db = require("../../db/connection"); // connect to the database

exports.fetchAllTopics = () => {
  // SQL query
  let queryString = `
    SELECT
     * 
    FROM
     topics
  `;

  // return db.query, return each row
  return db
    .query(queryString)
    .then((sqlQueryReturnObject) => {
      // console.log(sqlQueryReturnObject)
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      if (sqlQueryReturnObject.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No users found for this topic",
        });
      }
      return sqlQueryReturnObject;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};
