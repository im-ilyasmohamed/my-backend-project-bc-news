const db = require("../db/connection"); // connect to the database

exports.fetchAllArticles = () => {
  // create SQL Script
  const myQuery = `
    SELECT 
        articles.author,
        articles.title,
        articles.article_id,
        articles.body, //
        articles.topic,
        articles.created_at,
        articles.votes,
        articles.article_img_url,
        COUNT(articles.article_id) as comment_count  
    FROM articles
    INNER JOIN 
      comments  
    ON
      articles.article_id = comments.article_id
    ORDER BY 
        created_at
`;
  // error handling

  //return script query
  return db
    .query(myQuery)
    .then(({ rows }) => {
      console.log(rows); // DELETE ----------------
      return rows;
    })
    .catch((err) => err);
};
