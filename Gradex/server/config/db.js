import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'gradex',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'saif',
  ssl: process.env.NODE_ENV === 'production'
    ? { rejectUnauthorized: false }
    : false
});

pool.on('error', (err) => {
  console.error('Unexpected database error', err);
});

export const testConnection = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log('Connected to PostgreSQL database');
    return true;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    return false;
  }
};

export default pool;
