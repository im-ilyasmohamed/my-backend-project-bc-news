const db = require("../../db/connection"); // connect to the database

exports.fetchArticleByID = (articleID) => {
  // Check if articleID is a valid number
  // prevent sql injection, nan is checking to make sure only numbers can be inputed (including string number)
  if (articleID === undefined || isNaN(Number(articleID))) {
    return Promise.reject({
      status: 400,
      msg: "Invalid input: article_id must be a number",
    });
  }

  // SQL query where id is $1
  let queryString = `
  SELECT 
    articles.author,
    articles.title,
    articles.article_id,
    articles.body,
    articles.topic,
    articles.created_at,
    articles.votes,
    articles.article_img_url,
    COUNT(comments.comment_id) AS comment_count
  FROM 
    articles
  LEFT JOIN 
    comments ON articles.article_id = comments.article_id
  WHERE 
    articles.article_id = $1
  GROUP BY 
    articles.article_id;
      `;

  // query db, with params (queryString, $1)
  return db
    .query(queryString, [articleID])
    .then(({ rows }) => {
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No articles found for this topic",
        });
      }
      return rows;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};
exports.fetchAllArticles = () => {
  // SQL query
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
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No articles found for this topic",
        });
      }
      return rows;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};

exports.editIncrementVoteUsingArticleID = (article_id, newVote) => {
  // invalid param/id input, return 400 status
  // could improve by checking database has article number e.g. article being above 600 should not count
  if (isNaN(article_id)) {
    return Promise.reject({ status: 400, msg: "invalid input" }); // attempt at error handling
  }
  // Check if newVote is a valid number
  if (isNaN(Number(newVote))) {
    return Promise.reject({
      status: 400,
      msg: "Invalid input: newVote must be a number",
    });
  }

  // SQL query
  const myQuery = `
  UPDATE 
    articles
  SET
    votes = votes + $1
  WHERE
    article_id = $2
  RETURNING *;
  `;

  // return script query
  return db
    .query(myQuery, [newVote, article_id])
    .then(({ rows }) => {
      //console.log(rows);
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No articles found for this topic",
        });
      }
      return rows;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};

// Especialy important to prevent SQL injection when using string literals i.e. concat
// RISK OF SQL INJECTION
exports.fetchArticlesSortAndOrder = (sort_by, order) => {
  // Validate sort_by param to prevent SQL injection
  const validColumns = [
    "author",
    "title",
    "article_id",
    "topic",
    "created_at",
    "votes",
    "comment_count",
  ];
  if (!validColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort column" });
  }

  // Validate order
  const validOrder = ["asc", "desc"];
  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order" });
  }

  // SQL query
  // had to use string literals as it would not let me use $1, as it cant be used on sortby
  const query = `
    SELECT 
      articles.*,
      COUNT(comments.comment_id) AS comment_count
    FROM 
      articles
    LEFT JOIN
      comments ON articles.article_id = comments.article_id
    GROUP BY
      articles.article_id
    ORDER BY
    ${sort_by} ${order}
  `;

  // Execute query and return results
  return db
    .query(query)
    .then(({ rows }) => {
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No articles found for this topic",
        });
      }
      return rows;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};

exports.fetchAllArticlesQueryTopic = (topic) => {
  // Validate topic to prevent SQL injection or bad queries
  const validTopics = [
    "mitch",
    "cats",
    "paper",
    "coding",
    "football",
    "cooking",
  ]; // List of valid topics, adjust based on your actual topics

  if (!validTopics.includes(topic)) {
    console.log(topic);
    return Promise.reject({ status: 400, msg: "Invalid topic" });
  }

  // SQL query to fetch articles by topic
  const query = `
    SELECT 
      *
    FROM 
      articles
    WHERE 
      topic = $1
    ORDER BY
      created_at DESC;
  `;

  // Execute query and return results
  return db
    .query(query, [topic]) // Pass the topic as a parameter to avoid SQL injection
    .then(({ rows }) => {
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      // IMPROVE OTHER FUNCTIONS USING THIS ERROR HANDLING
      console.log(rows, "rows");
      if (rows.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "No articles found for this topic",
        });
      }
      return rows;
    })
    .catch((err) => {
      console.error("Database query error:", err);
      return Promise.reject({ status: 500, msg: "Internal Server Error" });
    });
};
