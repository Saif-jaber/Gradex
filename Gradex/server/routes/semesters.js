import express from "express";
import { authenticate } from "../middleware/auth.js";
import { getSemestersController, createSemesterController, deleteSemesterController } from "../controllers/semesterController.js";

const router = express.Router();

router.use(authenticate);
router.get("/", getSemestersController);
router.post("/", createSemesterController);
router.delete("/:id", deleteSemesterController);

export default router;
