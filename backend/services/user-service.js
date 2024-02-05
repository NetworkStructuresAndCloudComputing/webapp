import User from "../models/user.js";
import bcrypt from 'bcrypt'; // Add this line


export const searchById = async (params = {}) => {
  const user = await User.findOne({ where: { id: params.id } });
  return user;
};

export const searchByEmail = async (params = {}) => {
  const user = await User.findOne({where: {email: params.email}}); // exec returns a promise
  return user;
};

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
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error('User not found');
    }
    Object.assign(user, params);

    await user.save();

    return user;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};



