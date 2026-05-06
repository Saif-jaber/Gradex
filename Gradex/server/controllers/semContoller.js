// controllers/semesterController.js
import pool from "../config/db.js";

export const createSemester = async (req, res) => {
  try {
    const userId = req.user.id;

    const {name, academic_year, start_date, end_date} = req.body;

    if (!name) {
      return res.status(400).json({ error: "Semester name required" });
    }

    const result = await pool.query(
      `INSERT INTO semesters 
       (user_id, name, academic_year, start_date, end_date, gpa)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING *`,
      [userId, name, academic_year || null, start_date || null, end_date || null, 0]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create semester" });
  }
};

export const deleteSemester = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    // Check if semester belongs to this user
    const check = await pool.query(
      `SELECT * FROM semesters WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    if (check.rows.length === 0) {
      return res.status(403).json({ error: "Not authorized to delete this semester" });
    }

    // Delete semester (courses auto-delete via CASCADE)
    await pool.query(
      `DELETE FROM semesters WHERE id = $1`,
      [id]
    );

    res.json({ message: "Semester deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete semester" });
  }
};

export const getSemesters = async (req, res) => {
  try {
    const userId = req.user.id;

    const result = await pool.query(`
      SELECT 
        s.*,
        COALESCE(
          json_agg(c.*) FILTER (WHERE c.id IS NOT NULL),
          '[]'
        ) AS courses
      FROM semesters s
      LEFT JOIN courses c ON c.semester_id = s.id
      WHERE s.user_id = $1
      GROUP BY s.id
      ORDER BY s.created_at DESC
    `, [userId]);

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch semesters" });
  }
};