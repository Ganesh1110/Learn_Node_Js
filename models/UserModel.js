import db from "../config/db.js";
import bcrypt from "bcryptjs";

// User registration
const registerUser = (userData, callback) => {
  try {
    const { username, email, password } = userData;
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password

    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      callback
    );
  } catch (error) {
    throw error;
  }
};

// User login
const fetchUserByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return callback(err, null);
    }
    if (results.length === 0) {
      return callback(null, null); // No user found
    }
    return callback(null, results); // Found user
  });
};

export default { registerUser, fetchUserByEmail };
