import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import productRouter from "./routes/productRoutes.js";
import { CommonError } from "./middleware/ErrorHandler.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

//Env Config
const ENV = dotenv.config().parsed;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", productRouter);

// Error Handling Middleware
app.use(CommonError);

// Server
const PORT = ENV.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
