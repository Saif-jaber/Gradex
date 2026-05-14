import pool from '../config/db.js';
import format from 'pg-format';

// add course
export const addCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { semester_id, courses } = req.body;

    // 1. Validate input
    if (!semester_id || courses.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // 2. Check ownership 
    const semCheck = await pool.query(
      `SELECT * FROM semesters WHERE id = $1 AND user_id = $2`,
      [semester_id, userId]
    );

    if (semCheck.rows.length === 0) {
      return res.status(403).json({ error: "Not authorized to add course to this semester" });
    }

    // 3. convert the array to a mapped array of arrays
    const coursesVal = courses.map(course => [  // each item is called (course)
      semester_id,
      course.name,
      course.credits,
      course.status,
      course.grade,
    ]);

    const query = format(
      'INSERT INTO courses (semester_id, name, credits, status, grade) VALUES %L RETURNING *', 
      coursesVal
    );

    const result = await pool.query(query);
    res.status(201).json(result.rows);
  } catch (err) {
    console.error("=== ADD COURSE ERROR ===");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    res.status(500).json({ error: err.message || "Failed to add course" });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM courses c
       USING semesters s
       WHERE c.id = $1
       AND c.semester_id = s.id
       AND s.user_id = $2
       RETURNING c.*`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Not authorized to delete this course" });
    }

    res.json({ message: "Course deleted successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete course" });
  }
};

export const updateCourseStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { status, grade } = req.body;

    // 1. Validate status
    const validStatuses = ["taking", "completed", "dropped", "failed"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // 2. Update (with ownership check via join)
    const result = await pool.query(
      `UPDATE courses c
       SET status = $1,
           grade = $2,
           updated_at = NOW()
       FROM semesters s
       WHERE c.id = $3
       AND c.semester_id = s.id
       AND s.user_id = $4
       RETURNING c.*`,
      [
        status,
        status === "completed" ? grade : null, // only keep grade if completed
        id,
        userId
      ]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Not authorized to update this course" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update course status" });
  }
};