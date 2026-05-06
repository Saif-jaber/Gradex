import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // 1. Check header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Unauthorized: No token" });
    }

    const token = authHeader.split(" ")[1];

    // 2. Verify token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }

    // 3. Check user still exists in DB
    const userRes = await pool.query(
      "SELECT id, email FROM users WHERE id = $1",[decoded.id]
    );

    if (userRes.rows.length === 0) {
      return res.status(401).json({ error: "Unauthorized: User not found" });
    }

    // 4. Attach user to request
    req.user = {
      id: userRes.rows[0].id,
      email: userRes.rows[0].email
    };

    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    res.status(500).json({ error: "Server error" });
  }
};