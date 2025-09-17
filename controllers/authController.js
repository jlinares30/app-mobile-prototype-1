import User, { findOne } from '../models/User';
import { hash as _hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export async function register(req, res) {
  const { email, password } = req.body;
  try {
    const hash = await _hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();
    res.status(201).json({ message: 'Usuario creado' });
  } catch (error) {
    res.status(400).json({ error: 'Correo ya en uso' });
  }
}

Login
export async function login(req, res) {
  const { email, password } = req.body;
  const user = await findOne({ email });

  if (!user || !(await compare(password, user.password))) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = sign({ userId: user._id }, process.env.JWT_SECRET);
  res.json({ token });
}


