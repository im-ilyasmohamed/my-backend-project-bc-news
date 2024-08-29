// This will allow the hosting provider to start up the server.

const app = require("./app.js");
const { PORT = 9090 } = process.env;

app.listen(PORT, () => console.log(`Listen on {PORT}...`));
