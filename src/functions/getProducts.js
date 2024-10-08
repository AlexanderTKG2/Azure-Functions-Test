const { app } = require("@azure/functions");
const { getClientInstance } = require("../helpers/cosmos");
const env = require("../config/env");

let dbClient = null;
let isConnected = false;

async function getAllProducts() {
  const querySpec = {
    query: `SELECT * FROM c`,
  };

  const dbName = env.db.name;
  const container = env.db.container;

  const { resources: results } = await dbClient
    .database(dbName)
    .container(container)
    .items.query(querySpec)
    .fetchAll();

  // Log data
  for (var queryResult of results) {
    let resultString = JSON.stringify(queryResult);
    console.log(`\tQuery returned ${resultString}\n`);
  }

  return results;
}

async function handleEvent(request, context) {
  context.log(`Http function processed request for url "${request.url}"`);
  // const name = request.query.get('name') || await request.text() || 'world';
  const productsData = await getAllProducts();
  const responseBody = { data: [productsData] };
  return {
    status: 200,
    body: JSON.stringify(responseBody),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

app.http("getProducts", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      if (!isConnected) {
        dbClient = getClientInstance();
        isConnected = true;
      }
      const lambdaResponse = handleEvent(request, context);
      return lambdaResponse;
    } catch (error) {
      const errorResponse = {
        code: 500,
        status: "error",
        error: error.message,
      };
      return {
        status: 500,
        body: JSON.stringify(errorResponse),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  },
});
