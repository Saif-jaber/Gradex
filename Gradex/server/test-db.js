import { Pool } from 'pg';

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'gradex',
  user: 'postgres',
  password: 'saif',
});

try {
  const result = await pool.query('SELECT NOW()');
  console.log('Database connected successfully:', result.rows[0]);
  process.exit(0);
} catch (err) {
  console.error('Database connection error:', err.message);
  process.exit(1);
}
