import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import UserModel from "../models/UserModel.js";

const ENV = dotenv.config().parsed;

// Secret key for JWT
const JWT_SECRET = ENV.JWT_SECRET || "your_secret_key";

// User registration
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide all required fields." });
  }

  try {
    // Check if the email already exists in the database
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // If the email doesn't exist, proceed to register the user
    const hashedPassword = bcrypt.hashSync(password, 10); // Hash the password
    const result = await db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res
        .status(400)
        .json({ error: "User with this email or username already exists." });
    }
    return res.status(500).json({ error: "Error registering user" });
  }
};

// User login
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Please provide email and password." });
  }

  UserModel.fetchUserByEmail(email, (err, user) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    if (!user || user.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    bcrypt.compare(password, user[0].password, (err, isPasswordValid) => {
      if (err) {
        console.error("Password comparison error:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user[0].id, role: user[0].role },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    });
  });
};
