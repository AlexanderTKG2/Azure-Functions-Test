require("dotenv").config();
require("process");

const env = {
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    auth_key: process.env.DB_KEY,
    name: process.env.DB_NAME,
    container: process.env.DB_CONTAINER,
  },
};

module.exports = env;
