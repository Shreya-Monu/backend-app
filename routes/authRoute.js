import express from "express";
import {
login,
validateUser,
register,
registerUser,
logout
} from "../controllers/authController.js";

const authRouter = express.Router();

// Login Routes
authRouter.get("/login", login);
authRouter.post("/login", validateUser);

// Register Routes
authRouter.get("/register", register);
authRouter.post("/register", registerUser);

// Logout Route
authRouter.get("/logout", logout);

export default authRouter;
