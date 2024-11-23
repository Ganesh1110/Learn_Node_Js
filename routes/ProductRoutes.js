import express from "express";
import { getAllProducts } from "../controllers/productController.js";

const productRoutes = express.Router();

productRoutes.get("/getAllProducts", getAllProducts);

export default productRoutes;
