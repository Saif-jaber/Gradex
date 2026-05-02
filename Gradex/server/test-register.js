import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import pool from './config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

async function testRegister() {
  try {
    // Test DB connection
    const dbTest = await pool.query('SELECT NOW()');
    console.log('DB connected:', dbTest.rows[0]);

    // Test if users table exists
    const tableCheck = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);
    console.log('Users table exists:', tableCheck.rows[0].exists);

    // Try to create a test user
    const email = 'test@example.com';
    const password = 'test123';
    const name = 'Test User';

    // Check if user already exists
    const existing = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existing.rows.length > 0) {
      console.log('Test user already exists, deleting...');
      await pool.query('DELETE FROM users WHERE email = $1', [email]);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    console.log('Password hashed successfully');

    const result = await pool.query(
      'INSERT INTO users (email, password_hash, name) VALUES ($1, $2, $3) RETURNING id, email, name',
      [email, passwordHash, name]
    );
    console.log('User created:', result.rows[0]);

    const token = jwt.sign({ userId: result.rows[0].id }, JWT_SECRET, { expiresIn: '7d' });
    console.log('Token generated:', token.substring(0, 20) + '...');

    await pool.query('DELETE FROM users WHERE email = $1', [email]);
    console.log('Test passed!');

    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

testRegister();
