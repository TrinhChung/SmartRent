import { Router } from "express";
import { handleRegisterUser, handleLoginUser } from "../controllers/auth";
export const router = Router();

router.post("/register", handleRegisterUser);

router.post("/login", handleLoginUser);
