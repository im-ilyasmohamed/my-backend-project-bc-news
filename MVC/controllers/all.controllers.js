const { fetchAllTopics } = require("../models/topics.models"); // import model
const {
  fetchArticleByID,
  fetchAllArticles,
} = require("../models/articles.model");
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
exports.getAllArticles = (req, res) => {
  // get the data print it
  fetchAllArticles().then((allArticles) => {
    console.log(allArticles, "<---- all articles from the controller");
  });

  // send the status code, along with the
  res.status(200).send({ msg: "message from getAllArticles" });
};
