const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const authMiddleware = require('../utils/authMiddleware');

const usersFilePath = path.join(__dirname, '../users.json');

// Helper to read users
const readUsers = () => {
  try {
    if (!fs.existsSync(usersFilePath)) {
      fs.writeFileSync(usersFilePath, JSON.stringify([]));
    }
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users', error);
    return [];
  }
};

// Helper to write users
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const JWT_SECRET = process.env.JWT_SECRET || 'nexus_hackathon_super_secret_key';

// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, wallet } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const users = readUsers();
    
    // Check if user exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      role,
      wallet: wallet || ''
    };

    users.push(newUser);
    writeUsers(users);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const users = readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          wallet: user.wallet
        }
      });
    });
  } catch (error) {
    console.error('Login error', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// @route POST /api/auth/wallet-login
router.post('/wallet-login', async (req, res) => {
  try {
    const { wallet } = req.body;

    if (!wallet) {
      return res.status(400).json({ error: 'Please provide a wallet address' });
    }

    const users = readUsers();
    // Case-insensitive search
    const user = users.find(u => u.wallet && u.wallet.toLowerCase() === wallet.toLowerCase());

    if (!user) {
      return res.status(401).json({ error: 'No account associated with this wallet. Please register first.' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          wallet: user.wallet
        }
      });
    });
  } catch (error) {
    console.error('Wallet login error', error);
    res.status(500).json({ error: 'Server error during wallet login' });
  }
});

// @route GET /api/auth/me
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const users = readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Don't return password
    const { password, ...userWithoutPassword } = user;
    res.json(userWithoutPassword);
  } catch (error) {
    console.error('Get user error', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
