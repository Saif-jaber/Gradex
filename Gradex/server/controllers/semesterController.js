import { getSemesters, createSemester, deleteSemester } from "../services/semesterService.js";

export const getSemestersController = async (req, res) => {
  try {
    const semesters = await getSemesters(req.userId);
    res.json({ semesters });
  } catch (error) {
    console.error("Get semesters error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createSemesterController = async (req, res) => {
  try {
    const { name, academic_year, start_date, end_date } = req.body;
    if (!name) {
      return res.status(400).json({ error: "Semester name is required" });
    }
    const semester = await createSemester(req.userId, { name, academic_year, start_date, end_date });
    res.status(201).json({ message: "Semester created", semester });
  } catch (error) {
    console.error("Create semester error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteSemesterController = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await deleteSemester(req.userId, id);
    if (!result) {
      return res.status(404).json({ error: "Semester not found" });
    }
    res.json({ message: "Semester deleted" });
  } catch (error) {
    console.error("Delete semester error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
