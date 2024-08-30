const { fetchAllTopics } = require("../models/topics.models"); // import model
const {
  fetchArticleByID,
  fetchAllArticles,
} = require("../models/articles.model");
const { fetchCommentsByID } = require("../models/comments.model");

// --------- topics ----------
// gets all treasures, next input for handling errors
exports.getTopics = (req, res, next) => {
  // nothing in req object, no id, body etc
  // use the model
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
  //
};

// --------- articles ----------
// get article by id
// should use next for middleware error handline ---------------
exports.getArticleByID = (req, res) => {
  const { article_id } = req.params;
  fetchArticleByID(article_id)
    .then((articleItem) => {
      // need to put tempory error handling here

      res.status(200).send({ articleItem });
    })
    .catch((err) => {
      res.status(400).send({ msg: "invalid article ID" }); //
    });
};

//////////////////////////////////////
////// FINISH THIS FUNCTION //////////
//////////////////////////////////////
exports.getAllArticles = (req, res) => {
  // get the data print it
  fetchAllArticles().then((allArticles) => {
    res.status(200).send({ allArticles });
  });
};

// --------- comments ----------
exports.getCommentsByID = (req, res, next) => {
  const { article_id } = req.params;
  // get from model/database
  fetchCommentsByID(article_id)
    .then((commentItem) => {
      // send the status code, along with the article
      res.status(200).send({ commentItem });
    })
    .catch((err) => {
      next(err);
    });
};
