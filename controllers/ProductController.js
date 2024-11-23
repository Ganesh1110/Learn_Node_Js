import asyncHandler from "express-async-handler";
import ProductModel from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const results = await ProductModel.getAllProducts();
    res.status(200).json({
      status: 200,
      data: results,
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: err.message || "Error fetching products from the database",
    });
  }
};

export const createNewProduct = async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const results = await ProductModel.createProduct(name, price, description);
    res.status(201).json({
      status: 201,
      data: { id: results.insertId, name, price, description },
      message: "New Product Created Successfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
      message: err.message || "Error creating new product in the database",
    });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params; // Extract the product ID from the route params
  try {
    const result = await ProductModel.getProductById(id); // Call the model function
    if (!result || result.length === 0) {
      return res.status(404).json({ status: 404, error: "Product not found" });
    }
    res.status(200).json({ status: 200, data: result[0] }); // Return the first product
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ status: 500, error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params; // Extract the product id from the route params
  const { name, price, description } = req.body; // Extract product data from the request body

  try {
    const result = await ProductModel.updateProduct(id, {
      name,
      price,
      description,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 404, error: "Product not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params; // Extract the product ID from the request parameters

  try {
    const result = await ProductModel.deleteProduct(id); // Call the model function

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: 404, error: "Product not found" });
    }

    res.status(200).json({
      status: 200,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).json({
      status: 500,
      error: "Internal Server Error",
    });
  }
};
