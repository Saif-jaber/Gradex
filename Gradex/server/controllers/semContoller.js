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
    console.log("=== DELETE SEMESTER CONTROLLER CALLED ===");
    console.log("User ID:", req.user?.id);
    console.log("Semester ID param:", req.params.id);
    
    const userId = req.user.id;
    const { id } = req.params;

    // Check if semester belongs to this user
    console.log("Checking ownership for semester:", id, "and user:", userId);
    const check = await pool.query(
      `SELECT * FROM semesters WHERE id = $1 AND user_id = $2`,
      [id, userId]
    );

    console.log("Ownership check rows:", check.rows.length);

    if (check.rows.length === 0) {
      console.log("Forbidden - semester not found or not owned by user");
      return res.status(403).json({ error: "Not authorized to delete this semester" });
    }

    // Delete semester (courses auto-delete via CASCADE)
    console.log("Attempting to DELETE semester with id:", id);
    const deleteResult = await pool.query(
      `DELETE FROM semesters WHERE id = $1 RETURNING *`,
      [id]
    );
    
    console.log("DELETE result:", deleteResult.rows.length, "rows deleted");

    res.json({ message: "Semester deleted successfully", deleted: deleteResult.rows[0] });

  } catch (error) {
    console.error("=== DELETE SEMESTER ERROR ===");
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

// get semester id by name
export const getSemesterIdByName = async (req, res) => {
    try {
        const { name } = req.params;
        const user_id = req.user.id;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: 'Semester name is required'
            });
        }

        const query = `
            SELECT id
            FROM semesters
            WHERE name = $1
            AND user_id = $2
        `;

        const result = await pool.query(query, [name, user_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Semester not found'
            });
        }

        return res.status(200).json({
            success: true,
            semester_id: result.rows[0].id
        });

    } catch (error) {
        console.error('Get semester id error:', error);

        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// check if semester exists
export const checkSemesterExists = async (req, res) => {
    try {
        const { semester_id } = req.params;

        if (!semester_id) {
            return res.status(400).json({
                success: false,
                message: 'Semester ID is required'
            });
        }

        const query = `
            SELECT *
            FROM semesters
            WHERE id = $1
        `;

        const result = await pool.query(query, [semester_id]);

        if (result.rows.length === 0) {
            return res.status(404).json({
                success: false,
                exists: false,
                message: 'Semester not found'
            });
        }

        return res.status(200).json({
            success: true,
            exists: true,
            semester: result.rows[0]
        });

    } catch (error) {
        console.error('Check semester error:', error);

        return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};