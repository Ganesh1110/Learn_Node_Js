const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "G@Nesh@123!.",
  database: "ecommerce",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to the database.");
  }
});

db.query(
  "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
  ["Sample two", 91.84, "This is a sample product."],
  (err, results) => {
    if (err) {
      console.error("Error inserting data:", err.message);
    } else {
      console.log("Data inserted:", results);
    }
  }
);

db.query("Select * from products", (err, results) => {
  if (err) {
    console.log("Error in the query", err.message);
  } else {
    console.log("* ~ results:", results);
  }
});

db.end();
