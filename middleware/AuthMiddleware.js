import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const ENV = dotenv.config().parsed;

const JWT_SECRET = ENV.JWT_SECRET || "your_secret_key";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ error: "No token provided." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid or expired token." });
    }
    req.user = decoded; // Store decoded data (e.g., user ID and role)
    next();
  });
};

// Middleware to check if the user is an admin
export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Permission denied" });
  }
  next();
};
