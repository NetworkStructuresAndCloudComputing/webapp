import express from 'express';
import healthzRoute from './routes/healthz-route.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', healthzRoute);

app.all('*',(req,res) => {
  res.status(404).send();
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});