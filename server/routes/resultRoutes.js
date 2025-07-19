import express from "express";
import { saveResult, getResults } from "../controllers/resultController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/", authenticate, saveResult);
router.get("/", authenticate, getResults);

export default router;
