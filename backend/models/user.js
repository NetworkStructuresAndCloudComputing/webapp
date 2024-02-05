import { DataTypes } from 'sequelize';
import { sequelize } from '../services/database-service.js';

const userSchema = {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, 
  },
};

const User = sequelize.define('Users', userSchema);

export default User;
