import { Router } from "express";
import { fetchProducts } from "../models/products-models.js";
import {
  validateProduct,
  categorizeProducts,
  createProductController,
  getProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
} from "../controllers/products-controllers.js";

const router = Router();
router.get("/", async (req, res) => {
  const cur = req.query.cur;
  if (cur) {
    return res.json(await categorizeProducts(cur));
  }
  const products = await fetchProducts();
  res.json(products);
});

router.post("/", validateProduct, createProductController);
router.get("/:id", getProductByIdController);
router.put("/:id", validateProduct, updateProductByIdController);
router.delete("/:id", deleteProductByIdController);
export { router as productsRoutes };
