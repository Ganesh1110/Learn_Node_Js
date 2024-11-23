import db from "../config/db.js";

const getAllProduct = {
  getAllProducts: async () => {
    const [results] = await db.execute("SELECT * FROM products");
    return results;
  },
};

const createProducts = {
  createProduct: async (name, price, description) => {
    const [results] = await db.execute(
      "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
      [name, price, description]
    );
    return results;
  },
};

export default { getAllProduct, createProducts };
