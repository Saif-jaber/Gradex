import express from 'express';
import { createSemester, deleteSemester, getSemesters, checkSemesterExists, getSemesterIdByName, deleteAllSemesters } from '../controllers/semContoller.js';
import { verifyToken } from "../middleware/verifyToken.js";
import { checkSemesterOwnership } from "../middleware/checkSemesterOwnership.js";

const router = express.Router();

// Apply auth to ALL semester routes
router.use(verifyToken);

// Create semester
router.post("/add", createSemester);

// check if semester exists
router.get("/check/:semester_id", checkSemesterExists);

// get a semester by name of semester
router.get('/id/:name', getSemesterIdByName);

// Get all semesters (with courses)
router.get("/semList", getSemesters);

// Delete all semesters for the user
router.delete("/clear-all", deleteAllSemesters);

// Delete semester (must own it)
router.delete("/:id", checkSemesterOwnership, deleteSemester);

export default router;
