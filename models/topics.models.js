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

exports.fetchArticleByID = (articleID) => {
  //query string where id is $1
  let queryString = `
    SELECT 
        author,
        title,
        article_id,
        body,
        topic,
        created_at,
        votes,
        article_img_url
    FROM 
      articles
    WHERE 
      article_id = $1;
  `;

  //query db, with (queryString, $1)
  return db.query(queryString, articleID).then(({ rows }) => {
    console.log(rows);
  });
};
