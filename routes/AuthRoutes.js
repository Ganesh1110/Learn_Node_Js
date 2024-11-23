import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const authRoutes = express.Router();

// POST register user
authRoutes.post("/register", registerUser);

// POST login user
authRoutes.post("/login", loginUser);

export default authRoutes;
