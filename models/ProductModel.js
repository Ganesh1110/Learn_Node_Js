import db from "../config/db.js";

const getAllProducts = async () => {
  try {
    const [results] = await db.execute("SELECT * FROM products");
    return results;
  } catch (error) {
    throw error;
  }
};

const createProduct = async (name, price, description) => {
  try {
    const [results] = await db.execute(
      "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
      [name, price, description]
    );
    return results;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const [results] = await db.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return results; // Return the results directly
  } catch (error) {
    throw error; // Let the controller handle the error
  }
};

const updateProduct = async (id, data) => {
  try {
    const [results] = await db.query(
      "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
      [data.name, data.price, data.description, id]
    );
    return results; // Return the result from the query
  } catch (error) {
    throw error; // Throw the error to be handled in the controller
  }
};

const deleteProduct = async (id) => {
  try {
    const [results] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    return results; // Return the result of the deletion
  } catch (error) {
    throw error; // Throw error to be caught in the controller
  }
};

export default {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
