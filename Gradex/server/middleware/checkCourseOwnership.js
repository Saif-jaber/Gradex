export const checkCourseOwnership = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.id;

    const result = await pool.query(
      `SELECT c.* FROM courses c
       JOIN semesters s ON c.semester_id = s.id
       WHERE c.id = $1 AND s.user_id = $2`,
      [courseId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Forbidden: Not your course" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};