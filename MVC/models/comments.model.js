const db = require("../../db/connection"); // connect to db, for db.query(), from the pool

// create function
exports.fetchCommentsByID = (article_id) => {
  //      create query
  let myQuery = `
  SELECT * 
  FROM comments
  `;

  // basic error handline
  if (article_id === undefined || article_id === "") {
    return Promise.reject({ status: 400, msg: "invalid input" });
  }

  //      call on row funcction, .then() promise which return row from query
  db.query(myQuery, [article_id]).then(({ rows }) => rows);
};
