const { uuid } = require("uuidv4");

const mapNewProductCreationData = function (productData) {
  const newProductId = uuid();
  return {
    id: newProductId,
    name: productData.name,
    description: productData.description,
    code: productData.code,
    price: productData.price,
  };
};

module.exports = {
  mapNewProductCreationData,
};
