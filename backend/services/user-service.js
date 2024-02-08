import User from "../models/user.js";
import bcrypt from 'bcrypt'; // Add this line


export const searchById = async (params = {}) => {
  const user = await User.findOne({ where: { id: params.id } });
  const userResponse = { ...user.toJSON(), password: undefined };
  return userResponse;
};

export const searchByEmail = async (params = {}) => {
  try {
    const user = await User.findOne({ where: { username: params.username } });
    if (!user) {
      return null;
    }
    const userResponse = { ...user.toJSON(), password: undefined };
    return userResponse;
  } catch (error) {
    console.error('Error searching by email:', error);
    throw error;
  }
};


export const create = async (params = {}) => {
  try {
    const { username, password, ...rest } = params;

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(username)) {
      throw new Error('Invalid email address for username');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...rest, username, password: hashedPassword });
    await user.save();
    
    const userResponse = { ...user.toJSON(), password: undefined };

    return userResponse;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};


export const update = async (params, username) => {
  try {
    const allowedFields = ['firstName', 'lastName', 'password'];
    const updatedFields = Object.keys(params);
    const invalidFields = updatedFields.filter(field => !allowedFields.includes(field));

    if (invalidFields.length > 0) {
      throw new Error(`Invalid update fields: ${invalidFields.join(', ')}`);
    }

    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }

    const user = await User.findOne({ where: { username } });

    if (!user) {
      throw new Error('User not found');
    }

    Object.assign(user, params);
    await user.save();

    const userResponse = { ...user.toJSON(), password: undefined };
    return userResponse;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};