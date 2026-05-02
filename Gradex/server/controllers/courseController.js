import { getCourses, createCourse, deleteCourse } from "../services/courseService.js";

export const getCoursesController = async (req, res) => {
  try {
    const { semesterId } = req.params;
    const courses = await getCourses(semesterId);
    res.json({ courses });
  } catch (error) {
    console.error("Get courses error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createCourseController = async (req, res) => {
  try {
    const { semesterId } = req.params;
    const { name, code, credits, grade, grade_points, status } = req.body;

    if (!name || !credits) {
      return res.status(400).json({ error: "Course name and credits are required" });
    }

    const course = await createCourse(semesterId, { name, code, credits, grade, grade_points, status });
    res.status(201).json({ message: "Course added", course });
  } catch (error) {
    console.error("Create course error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCourseController = async (req, res) => {
  try {
    const { semesterId, courseId } = req.params;
    const result = await deleteCourse(courseId, semesterId);
    if (!result) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted" });
  } catch (error) {
    console.error("Delete course error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
