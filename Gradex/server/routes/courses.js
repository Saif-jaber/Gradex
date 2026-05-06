import express from 'express';
import { addCourse, deleteCourse, updateCourseStatus } from '../controllers/courseController.js';
import { verifyToken } from "../middleware/verifyToken.js";
import { checkCourseOwnership } from '../middleware/checkCourseOwnership.js';

const router = express.Router();

// Apply auth to ALL semester routes
router.use(verifyToken);

// Create course
router.post("/add", addCourse);

// update a course status
router.post("/updateStatus/:id", updateCourseStatus);

// Delete semester (must own it)
router.delete("/:id", checkCourseOwnership, deleteCourse);

export default router;