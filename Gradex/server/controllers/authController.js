import pool from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// signup user
export const signup = async (req, res) => {
    try {
        const  {email, password, name} =req.body;

        const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (existingUser.rows.length > 0) { //  check if user exists
            return res.status(400).send('User already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 10); // hash password
        //  add the new user
        const newUser = await pool.query("INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id, name, email", [name, email, hashedPassword])
        res.status(201).json({ user: newUser.rows[0], message: 'Signup successful' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
}

// login user

export const login = async (req, res) =>{
  try {
    const { email, password } = req.body;

    const result = await pool.query('SELECT * FROM users WHERE email = $1',[email]);

    const user = result.rows[0];

    if (!user) {
      return res.status(400).send('User not found');
    }

    // compare password
    const valid = await bcrypt.compare(password, user.password_hash);

    if (!valid) {
      return res.status(400).send('Wrong password');
    }

    // create token
    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
}

export const getUserID = async (req, res) => {
  try {
    const result = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    const userId = result.rows[0]?.id;

    if(!userid){
      return res.status(400).send('user not found');
    }

  } catch (error) {
      res.status(500).send('Server error');
  }
}