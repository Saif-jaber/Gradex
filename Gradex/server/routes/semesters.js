import express from 'express';
import { createSemester, deleteSemester, getSemesters } from '../controllers/semContoller.js';
import { verifyToken } from "../middleware/verifyToken.js";
import { checkSemesterOwnership } from "../middleware/checkSemesterOwnership.js";

const router = express.Router();

// Apply auth to ALL semester routes
router.use(verifyToken);

// Create semester
router.post("/add", createSemester);

// Get all semesters (with courses)
router.get("/semList", getSemesters);

// Delete semester (must own it)
router.delete("/:id", checkSemesterOwnership, deleteSemester);

export default router;
