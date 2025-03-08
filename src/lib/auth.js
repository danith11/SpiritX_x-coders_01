import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => await bcrypt.hash(password, 10);
export const comparePassword = async (password, hash) => await bcrypt.compare(password, hash);
export const signToken = (user) => jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);