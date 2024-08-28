const express = require("express"); // import express api
const { getTopics } = require("./controllers/topics.controller"); // require in controller class
const app = express(); // create and invoke instance of express object object

app.get("/api/topics", getTopics); //create api endpoint for /api/topics

// create endpoint for this, default for route '/'
// had to put this function at the bottom of the api route options for it to work
app.all("/*", (req, res) => {
  //all is for get post etc
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
