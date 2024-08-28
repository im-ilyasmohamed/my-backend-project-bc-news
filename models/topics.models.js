const db = require("../db/connection"); // connect to the database

exports.fetchAllParks = () => {
  // let query string literals for db query

  let queryString = `
  SELECT * 
  FROM topics
  `;

  // return db.query, return each row
  return db.query(queryString).then((sqlQueryReturnObject) => {
    // console.log(sqlQueryReturnObject)
    return sqlQueryReturnObject;
  });
};

