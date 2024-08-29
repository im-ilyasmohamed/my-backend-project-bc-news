
const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

// hopefull config file doesnt cause too many problems
// This will allow a connection to the hosted database from a local machine. 
// The config object also needs a max property to limit how many connections the pool will have available.
const config = {};
if (ENV === "production") {
  config.connectionString = process.env.DATABASEURL;
  config.max = 2;
}

if (!process.env.PGDATABASE && process.env.DATABASEURL) {
  throw new Error("PGDATABASE not set or DATABASE_URL not set");
}

module.exports = new Pool(config);
