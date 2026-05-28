import pool from '../config/db.js';

export const checkSemesterOwnership = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const semesterId = req.params.id || req.body.semester_id;

    // Safety check: reject non-numeric IDs
    if (semesterId && isNaN(Number(semesterId))) {
      return res.status(400).json({ error: "Invalid semester ID" });
    }

    const result = await pool.query(
      "SELECT * FROM semesters WHERE id = $1 AND user_id = $2",
      [semesterId, userId]
    );

    if (result.rows.length === 0) {
      return res.status(403).json({ error: "Forbidden: Not your semester" });
    }

    next();
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};