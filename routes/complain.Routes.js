import express from "express";
import { createcomplain } from "../controller/complainController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post(
  "/createcomplain",
  upload.array("file", 12),
  createcomplain
);

export default router;