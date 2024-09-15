const db = require("../../db/connection"); // connect to db, for db.query(), from the pool

exports.fetchCommentsByID = (article_id) => {
  // Basic error handling
  // || !isNaN(article_id) - SQL injection prevention, put into line below
  if (article_id === undefined || article_id === "") {
    return Promise.reject({
      status: 400,
      msg: "invalid input" || isNaN(article_id),
    });
  }

  // SQL query
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
      article_id = $1;
  `;

  // console.log();
  // call on row funcction, .then() promise which return row from query
  return db
    .query(myQuery, [article_id])
    .then(({ rows }) => rows)
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};

exports.pushCommentUsernameBoyID = (article_id, username, body) => {
  // basic error handling
  if (!article_id || !username || !body || isNaN(article_id)) {
    return Promise.reject({
      status: 400,
      msg: "Missing required database fields",
    });
  }

  // const createdAt = Date.now(); // for timestamp in ms

  //console.log(article_id, username, body);

  // SQL query
  let myQuery = `
    INSERT INTO
      comments (body, author, article_id)
    VALUES
      ($1, $2, $3)
    RETURNING 
      *;
  `;

  //db quert
  return db
    .query(myQuery, [body, username, article_id])
    .then((result) => {
      // console.log(result, "rows here");
      return result.rows[0];
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};

exports.deleteCommentByCommentId = (comment_id) => {
  // SQL query
  let myQuery = `
  DELETE
  FROM
    comments 
  WHERE
    comment_id = $1
  RETURNING 
    *;
`;
  // basic error handling, could be improved, currently making sure comment id is a number
  if (isNaN(comment_id)) {
    return Promise.reject({
      status: 404,
      msg: "resource not found, invalid input",
    });
  }

  //
  return db
    .query(myQuery, [comment_id])
    .then(({ rows }) => {
      //basic error handling
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "resource not found" });
      }
      return rows;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};
