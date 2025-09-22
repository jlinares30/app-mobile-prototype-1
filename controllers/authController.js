import User, { findOne } from '../models/User';
import { hash as _hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const { email, password } = req.body;
  try {
    const hash = await _hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Email already in use' });
  }
}


export async function login(req, res) {
  const { email, password } = req.body;
  const user = await findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
}

