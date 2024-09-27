const CosmosClient = require("@azure/cosmos").CosmosClient;
const url = require("url");
const env = require("../config/env");

const getClientInstance = () => {
  const dbConnectionUrl = `${env.db.host}:${env.db.port}/`;
  const dbAuthKey = env.db.auth_key;
  const dbName = env.db.name;
  const container = env.db.container;

  const options = {
    endpoint: dbConnectionUrl,
    key: dbAuthKey,
  };

  const client = new CosmosClient(options);
  return client;
};

module.exports = {
  getClientInstance,
};
