import User from "../models/user.js";
import bcrypt from 'bcrypt'; // Add this line

export const create = async (params = {}) => {
  const { password, ...rest } = params;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ ...rest, password: hashedPassword });
  return await user.save();
};
