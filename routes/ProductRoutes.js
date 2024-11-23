import express from "express";
import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/ProductController.js";

const productRouter = express.Router();

// GET All product
productRouter.get("/getAllProductList", getAllProducts);

// CREATE New product
productRouter.get("/createProduct", createNewProduct);

// GET product by ID
productRouter.get("/getProductById/:id", getProductById);

// PUT update product by ID
productRouter.put("/updateProduct/:id", updateProduct);

// DELETE a product by ID
productRouter.delete("/deleteProducts/:id", deleteProduct);

export default productRouter;
