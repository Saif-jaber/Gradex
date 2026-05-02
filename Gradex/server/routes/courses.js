import express from "express";
import { authenticate } from "../middleware/auth.js";
import { getCoursesController, createCourseController, deleteCourseController } from "../controllers/courseController.js";

const router = express.Router();

router.use(authenticate);
router.get("/:semesterId/courses", getCoursesController);
router.post("/:semesterId/courses", createCourseController);
router.delete("/:semesterId/courses/:courseId", deleteCourseController);

export default router;
