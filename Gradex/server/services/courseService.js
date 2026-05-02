import pool from "../config/db.js";

export const getCourses = async (semesterId) => {
  const query = `SELECT * FROM courses WHERE semester_id = $1 ORDER BY created_at`;
  const result = await pool.query(query, [semesterId]);
  return result.rows;
};

export const createCourse = async (semesterId, { name, code, credits, grade, grade_points, status }) => {
  const query = `
    INSERT INTO courses (semester_id, name, code, credits, grade, grade_points, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
  `;
  const result = await pool.query(query, [semesterId, name, code, credits, grade, grade_points, status || 'in_progress']);
  return result.rows[0];
};

export const deleteCourse = async (courseId, semesterId) => {
  const query = `DELETE FROM courses WHERE id = $1 AND semester_id = $2 RETURNING id`;
  const result = await pool.query(query, [courseId, semesterId]);
  return result.rows[0];
};
