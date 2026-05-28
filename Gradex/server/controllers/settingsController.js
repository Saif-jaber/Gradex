import pool from "../config/db.js";

export const getSettings = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user profile fields (university, major)
    const userRes = await pool.query(
      "SELECT university, major FROM users WHERE id = $1",
      [userId]
    );

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Get academic settings (insert default row if missing)
    const settingsRes = await pool.query(
      `INSERT INTO settings (user_id) VALUES ($1)
       ON CONFLICT (user_id) DO NOTHING
       RETURNING *`,
      [userId]
    );

    let settings;
    if (settingsRes.rows.length > 0) {
      settings = settingsRes.rows[0];
    } else {
      const existing = await pool.query(
        "SELECT * FROM settings WHERE user_id = $1",
        [userId]
      );
      settings = existing.rows[0];
    }

    res.json({
      university: userRes.rows[0].university,
      major: userRes.rows[0].major,
      maxGpa: settings.max_gpa,
      semestersPerYear: settings.semesters_per_year,
      graduationCredits: settings.graduation_credits,
      defaultCredits: settings.default_credits,
    });
  } catch (error) {
    console.error("=== GET SETTINGS ERROR ===");
    console.error(error);
    res.status(500).json({ error: "Failed to load settings" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const userId = req.user.id;
    const { university, major, maxGpa, semestersPerYear, graduationCredits, defaultCredits } = req.body;

    // Update user profile fields if provided
    if (university !== undefined || major !== undefined) {
      const updates = [];
      const values = [];
      let param = 1;

      if (university !== undefined) {
        updates.push(`university = $${param++}`);
        values.push(university);
      }
      if (major !== undefined) {
        updates.push(`major = $${param++}`);
        values.push(major);
      }
      values.push(userId);

      await pool.query(
        `UPDATE users SET ${updates.join(", ")}, updated_at = NOW() WHERE id = $${param}`,
        values
      );
    }

    // Update academic settings if any provided
    if (maxGpa !== undefined || semestersPerYear !== undefined || graduationCredits !== undefined || defaultCredits !== undefined) {
      // Ensure settings row exists
      await pool.query(
        `INSERT INTO settings (user_id) VALUES ($1) ON CONFLICT (user_id) DO NOTHING`,
        [userId]
      );

      const updates = [];
      const values = [];
      let param = 1;

      if (maxGpa !== undefined) {
        updates.push(`max_gpa = $${param++}`);
        values.push(maxGpa);
      }
      if (semestersPerYear !== undefined) {
        updates.push(`semesters_per_year = $${param++}`);
        values.push(semestersPerYear);
      }
      if (graduationCredits !== undefined) {
        updates.push(`graduation_credits = $${param++}`);
        values.push(graduationCredits);
      }
      if (defaultCredits !== undefined) {
        updates.push(`default_credits = $${param++}`);
        values.push(defaultCredits);
      }
      values.push(userId);

      await pool.query(
        `UPDATE settings SET ${updates.join(", ")}, updated_at = NOW() WHERE user_id = $${param}`,
        values
      );
    }

    res.json({ message: "Settings saved successfully" });
  } catch (error) {
    console.error("=== UPDATE SETTINGS ERROR ===");
    console.error(error);
    res.status(500).json({ error: "Failed to save settings" });
  }
};
