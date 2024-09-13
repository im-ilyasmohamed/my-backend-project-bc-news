const express = require("express"); // import express api
const {
  getTopics,
  getArticleByID,
  getCommentsByID,
  getAllArticles,
  postComments,
  putIncrementVoteUsingArticleID,
  removeCommentByCommentId,
} = require("./MVC/controllers/all.controllers"); // require in controller class
const endpoints = require("./endpoints.json"); //require in static json file, showing list of endpoints for /api route

const app = express(); // create and invoke instance of express object object
// global error handler middleware, with default status code and message
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .send({ msg: err.message || "Internal Server Error" });
});

app.use(express.json()); // processing post

// ------- api endpoints -----------------------------------
app.get("/api/topics", getTopics); //create api endpoint for /api/topics

// Define the /api endpoint
app.get("/api", (req, res) => {
  res.status(200).send(endpoints); // this will send endpoint.json file, in the body for integration test etc
});
app.get("/api/articles/:article_id", getArticleByID);
app.get("/api/articles/", getAllArticles);
app.get("/api/articles/:article_id/comments", getCommentsByID);
app.post("/api/articles/:article_id/comments", postComments);
app.patch("/api/articles/:article_id", putIncrementVoteUsingArticleID);
app.delete("/api/comments/:comment_id", removeCommentByCommentId);
// ----------------------------------------------------------

// create endpoint for this, default for route '/'
// had to put this function at the bottom of the api route options for it to work
app.all("/*", (req, res) => {
  // all is for - get, post, put, delete, etc
  res.status(404).send({ msg: "404 Not Found" }); // - // - // - //
});

module.exports = app; // would not be required if using insomnia

//  // In this context, we dont require to listen as superset/test is being used to request rather than http/insomnia
//  therefore dont need to start the servers
//  app.listen(8080, (err) => {
//  if (err) {
//    console.log(err);
//  } else {
//    console.log(`Server is running on port ${PORT}`);
//  });
//
