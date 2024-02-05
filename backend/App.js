import express from 'express';
import basicAuth from 'express-basic-auth';
import healthzRoute from './routes/healthz-route.js';
import createUser from './routes/register-route.js';
import User from './models/user.js';
import updateUser from './routes/user-route.js';
import dotenv from 'dotenv';

const app = express();
const PORT = 3000;

const basicAuthOptions = {
  users: { [process.env.BASIC_AUTH_USERNAME]: process.env.BASIC_AUTH_PASSWORD }, 
  challenge: true,
  unauthorizedResponse: '', 
};

app.use('/user', basicAuth(basicAuthOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', healthzRoute);
app.use('/', createUser);
app.use('/', updateUser);

User.sync()
  .then(() => {
    console.log('User model synchronized with the database');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error synchronizing User model with the database:', error);
  });
