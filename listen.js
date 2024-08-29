// This will allow the hosting provider to start up the server
const app = require("./app.js");

const { PORT = 9090 } = require("./app.js");
app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
