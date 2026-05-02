import pool from "../config/db.js";

export const getSemesters = async (userId) => {
  const query = `
    SELECT s.*, 
           COUNT(c.id) as course_count,
           COALESCE(SUM(CASE WHEN c.status = 'completed' THEN c.credits ELSE 0 END), 0) as total_credits
    FROM semesters s
    LEFT JOIN courses c ON s.id = c.semester_id
    WHERE s.user_id = $1
    GROUP BY s.id
    ORDER BY s.created_at DESC
  `;
  const result = await pool.query(query, [userId]);
  return result.rows;
};

export const createSemester = async (userId, { name, academic_year, start_date, end_date }) => {
  const query = `
    INSERT INTO semesters (user_id, name, academic_year, start_date, end_date)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const result = await pool.query(query, [userId, name, academic_year, start_date, end_date]);
  return result.rows[0];
};

export const deleteSemester = async (userId, semesterId) => {
  const query = `DELETE FROM semesters WHERE id = $1 AND user_id = $2 RETURNING id`;
  const result = await pool.query(query, [semesterId, userId]);
  return result.rows[0];
};
