import User from "../models/user.js";
import bcrypt from 'bcrypt'; // Add this line

export const create = async (params = {}) => {
  const { password, ...rest } = params;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ ...rest, password: hashedPassword });
  return await user.save();
};

export const update = async (params, id) => {
  try {
    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }
    const [rowsUpdated] = await User.update(params, {
      where: { id },
    });
    if (rowsUpdated > 0) {
      const updatedUser = await User.findByPk(id);
      return updatedUser;
    } else {
      throw new Error('User not found or not updated');
    }
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};


