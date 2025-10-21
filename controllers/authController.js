import User from '../models/User.js';
import { hash as _hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function register(req, res) {
  const {name, email, password } = req.body;
  try {
    const hash = await _hash(password, 10);
    const user = new User({name, email, password: hash });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Email already in use' });
  }
}


export async function login(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
console.log("JWT_SECRET:", process.env.JWT_SECRET);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
}

