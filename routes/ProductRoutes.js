import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/ProductController.js";
import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const productRouter = express.Router();

// GET All product
productRouter.get("/getAllProductList", getAllProducts);

// CREATE New product
productRouter.get("/createProduct", verifyToken, isAdmin, createNewProduct);

// GET product by ID
productRouter.get("/getProductById/:id", getProductById);

// PUT update product by ID
productRouter.put("/updateProduct/:id", verifyToken, isAdmin, updateProduct);

// DELETE a product by ID
productRouter.delete(
  "/deleteProducts/:id",
  verifyToken,
  isAdmin,
  deleteProduct
);

export default productRouter;
