const { fetchAllParks, fetchArticleByID } = require("../models/topics.models"); // import model

// gets all treasures, next input for handling errors
exports.getTopics = (req, res, next) => {
  // nothing in req object, no id, body etc
  // use the model
  fetchAllParks()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
  //
};

// get article by id
exports.getArticleByID = (req, res, next) => {
  const { id } = req.params;
  console.log(id, "<----- id");
  fetchArticleByID(id).then(() =>
    //
    {
      //
    }
  );
};
