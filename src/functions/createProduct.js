const { app } = require("@azure/functions");
const { getClientInstance } = require("../helpers/cosmos");
const { validateProductSchema } = require("../helpers/validation");
const { mapNewProductCreationData } = require("../helpers/mappers");
const env = require("../config/env");

let dbClient = null;
let isConnected = false;

async function handleEvent(request, context) {
  const postJsonBody = await request.json();

  validateProductSchema(postJsonBody);

  const newProductData = mapNewProductCreationData(postJsonBody);

  const dbName = env.db.name;
  const container = env.db.container;

  const { item } = await dbClient
    .database(dbName)
    .container(container)
    .items.upsert(newProductData);

  // Raw Data processing
  // const requestBodyDataStream = request.body;
  // for await (const chunk of requestBodyDataStream) {
  // [process chunk]
  // }

  const createdItemResponse = { message: "Created", data: { id: item.id } };

  return {
    status: 201,
    body: JSON.stringify(createdItemResponse),
    headers: {
      "Content-Type": "application/json",
    },
  };
}

app.http("createProduct", {
  methods: ["POST"],
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
