const db = require("../../db/connection"); // connect to the database

exports.fetchAllTopics = () => {
  // SQL query
  let queryString = `
  SELECT * 
  FROM topics
  `;

  // return db.query, return each row
  return db
    .query(queryString)
    .then((sqlQueryReturnObject) => {
      // console.log(sqlQueryReturnObject)
      return sqlQueryReturnObject;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};
