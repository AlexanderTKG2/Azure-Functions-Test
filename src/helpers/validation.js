const validateProductSchema = function (productData) {
  // validate data exists

  if (!productData) {
    throw new Error("Empty product data");
  }

  // validate product name
  if (
    !(
      productData.name &&
      typeof productData.name === "string" &&
      productData.name.trim() !== ""
    )
  ) {
    throw new Error("Error in product name property");
  }

  // validate product description

  if (
    !(
      productData.description &&
      typeof productData.description === "string" &&
      productData.description.trim() !== ""
    )
  ) {
    throw new Error("Error in product description property");
  }

  // validate product code

  if (
    !(
      productData.code &&
      typeof productData.code === "string" &&
      productData.code.trim() !== ""
    )
  ) {
    throw new Error("Error in product code property");
  }

  // validate product price

  if (
    !(
      productData.price &&
      typeof productData.price === "number" &&
      !isNaN(productData.price)
    )
  ) {
    throw new Error("Error in product price property");
  }
};

module.exports = {
  validateProductSchema,
};
