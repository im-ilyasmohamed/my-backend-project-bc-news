const { fetchAllTopics } = require("../models/topics.models");
const {
  fetchArticleByID,
  fetchAllArticles,
  editIncrementVoteUsingArticleID,
} = require("../models/articles.model");
const {
  fetchCommentsByID,
  pushCommentUsernameBoyID,
  deleteCommentByCommentId,
} = require("../models/comments.model");
const { fetchAllUsers } = require("../models/users");

// --------- topics ----------
// gets all topics, next input for handling errors
exports.getTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics }); //201 for post
    })
    .catch((err) => {
      next(err);
    });
  //
};

// --------- articles ----------
// get article by id
// should use next for middleware error handline ---------------
exports.getArticleByID = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleByID(article_id)
    .then((articleItem) => {
      // need to put tempory error handling here

      res.status(200).send({ articleItem });
    })
    .catch((err) => {
      next(err);
    });
};

// get all articles
exports.getAllArticles = (req, res, next) => {
  // get the data print it
  fetchAllArticles()
    .then((allArticles) => {
      res.status(200).send({ allArticles });
    })
    .catch((err) => {
      next(err); //
    });
};

exports.putIncrementVoteUsingArticleID = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;

  // console.log
  //console.log("Edits Here", article_id, inc_votes);

  // send status code and object
  editIncrementVoteUsingArticleID(article_id, inc_votes)
    .then((editecArticle) => {
      res.status(200).send({ editecArticle });
    })
    .catch((err) => next(err));
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

exports.postComments = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body; // body = the actial comment body
  // call model function
  //console.log(article_id, username, body, "<-------------");

  pushCommentUsernameBoyID(article_id, username, body)
    .then((pushedComment) => {
      //  console.log(pushedComment);
      //  console.log(article_id, "<-------------");
      res.status(201).send({ pushedComment });
    })
    .catch((err) => {
      next(err);
    });
};

exports.removeCommentByCommentId = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentByCommentId(comment_id)
    .then((deletedComment) => {
      //console.log(deletedComment)
      res.status(204).send({});
    })
    .catch((err) => next(err));
};

// --------- users ----------
exports.getAllUsers = (req, res, next) => {
  // call model function to get data
  // then
  // response good or bad
  fetchAllUsers()
    .then((allUsers) => {
      res.send({ allUsers });
    })
    .catch((err) => {
      next(err);
    });
};
