import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize('CloudComputing', 'root', '2108786Z@kir', {
  host: 'localhost',
  dialect: 'mysql',
});


export { sequelize };
