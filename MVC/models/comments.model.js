const db = require("../../db/connection"); // connect to db, for db.query(), from the pool

// create function
exports.fetchCommentsByID = (article_id) => {
  //      create query
  let myQuery = `
    SELECT 
      comment_id,
      votes,
      created_at,
      author,
      body,
      article_id
    FROM 
      comments
    WHERE 
      article_id = $1
  
  `;

  // basic error handling
  if (article_id === undefined || article_id === "") {
    return Promise.reject({ status: 400, msg: "invalid input" });
  }
  // console.log();
  // call on row funcction, .then() promise which return row from query
  return db.query(myQuery, [article_id]).then(({ rows }) => rows);
};
