import express from 'express';
import healthzRoute from './routes/healthz-route.js';
import createUser from './routes/register-route.js';
import User from './models/user.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', healthzRoute);
app.use('/', createUser);

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
