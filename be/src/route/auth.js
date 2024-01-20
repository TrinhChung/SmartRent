import { Router } from "express";
import {
  handleRegisterUser,
  handleLoginUser,
  handleLoginByToken,
  handleLogoutUser,
} from "../controllers/auth";
const SchemaValidator = require("nodejs-schema-validator");
const schemaValidatorInstance = new SchemaValidator();
import { signUpSchema, loginSchema } from "../schema/auth";
import { authenticate } from "../middleware/authenticate";

export const router = Router();

router.post(
  "/register",
  schemaValidatorInstance.validateBody(signUpSchema),
  handleRegisterUser
);

router.post(
  "/login",
  schemaValidatorInstance.validateBody(loginSchema),
  handleLoginUser
);

router.get("/me", authenticate, handleLoginByToken);

router.get("/logout", authenticate, handleLogoutUser);
