import { Router } from "express";
import { handleBulkCreateFloors } from "../controllers/floor";
import { authenticate } from "../middleware/authenticate";
export const router = Router();

router.post("/bulk", authenticate, handleBulkCreateFloors);
