const { app } = require("@azure/functions");

app.http("getProducts", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log(`Http function processed request for url "${request.url}"`);
    // const name = request.query.get('name') || await request.text() || 'world';

    const defaultProduct = {
      name: "Lorem Ipsum",
      description: "Lorem Ipsum",
      code: "00000",
      price: 1,
    };
    const productsData = [defaultProduct];
    const responseBody = { data: productsData };
    return {
      body: JSON.stringify(responseBody),
      headers: {
        "Content-Type": "application/json",
      },
    };
  },
});
