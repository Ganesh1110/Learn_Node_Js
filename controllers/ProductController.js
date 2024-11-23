import ProductModel from "../models/ProductModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const results = await ProductModel.getAllProduct();
    res.status(200).json({
      status: 200,
      data: results,
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      data: null,
      error: "Fetch issue from Database",
    });
  }
};
