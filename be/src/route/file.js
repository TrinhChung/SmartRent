import { Router } from "express";
import { handleGetFileUpload, handleUploadImage } from "../controllers/file";
import multer from "multer";

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 10 * 1024 * 1024,
});

export const router = Router();
router.post("/upload/image", Multer.array("file", 5), handleUploadImage);

router.get("/upload/image", handleGetFileUpload);
