const db = require("../../db/connection"); // connect to the database

exports.fetchArticleByID = (articleID) => {
  // query string where id is $1
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
  // invalid param/id input, return 400 status
  if (articleID === undefined) {
    return Promise.reject({ status: 400, msg: "invalid input" }); // attempt at error handling
  }

  // query db, with params (queryString, $1)
  return db.query(queryString, [articleID]).then(({ rows }) => {
    return rows;
  });
};

exports.fetchAllArticles = () => {
  // create SQL Script
  const myQuery = `
    SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.body, 
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(comments.comment_id) as comment_count  
    FROM 
      articles
    LEFT JOIN 
      comments  
    ON
      articles.article_id = comments.article_id
    GROUP BY 
        articles.author,
        articles.title,
        articles.article_id,
        articles.body, 
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url
    ORDER BY 
        created_at;
`;
  // error handling

  //return script query
  return db
    .query(myQuery)
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => err);
};
