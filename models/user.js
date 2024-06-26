import { DataTypes } from 'sequelize';
import { sequelize } from '../services/database-service.js';

const userSchema = {
  uid: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
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
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  account_created: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  account_updated: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  expirationTime: {
    type: DataTypes.DATE
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
};

const User = sequelize.define('Users', userSchema, {
  createdAt: 'account_created',
  updatedAt: 'account_updated',
});

export default User;
