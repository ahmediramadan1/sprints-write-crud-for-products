import {
  fetchProducts,
  fetchRate,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../models/products-models.js";
import { validateProduct } from "../services/validate-product.js";
import { groupWithCategory } from "../services/product-categorization.js";

const transferCurrency = (products, rate) => {
  return products.map((el) => ({ ...el, price: el.price * rate }));
};

const categorizeProducts = async (curr) => {
  const [products, rate] = await Promise.all([
    fetchProducts(),
    fetchRate(curr),
  ]);

  const transformedPrices = transferCurrency(products, rate);
  return groupWithCategory(transformedPrices);
};

const getProductByIdController = async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await getProductById(productId);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

const createProductController = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);
    res.send({ newProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

const updateProductByIdController = async (req, res) => {
  const productId = req.params.id;

  try {
    const updatedProduct = await updateProductById(productId, req.body);
    res.send({ updatedProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

const deleteProductByIdController = async (req, res) => {
  const productId = req.params.id;

  try {
    await deleteProductById(productId);
    res.send({ message: "Product deleted." });
  } catch (error) {
    console.log(error);
    res.status(400).json(JSON.parse(error.message));
  }
};

export {
  validateProduct,
  categorizeProducts,
  createProductController,
  getProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
};
