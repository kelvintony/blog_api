import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import postRoute from './routes/postRoute.js';
import userRoute from './routes/userRoute.js';
import dotenv from 'dotenv';

const app = express();

const port = process.env.PORT || 5000;

dotenv.config();

//middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '30mb', extended: 'true' }));
app.use(express.urlencoded({ limit: '30mb', extended: 'true' }));
app.use(cors());
//
//

app.get('/', (req, res) => {
  res.send('Welcome to the workspace');
});

mongoose
  .connect(process.env.MONGOBD_URL) //mongodb://127.0.0.1:27017/student2023BlogDb
  .then(() => {
    app.listen(port, () => {
      console.log('server is running on port ' + port);
      console.log('MongoDb connected successfully');
    });
  })
  .catch((error) => {
    console.log('did not connect: ' + error);
  });

// API End points or Routes

app.use('/posts', postRoute);
app.use('/users', userRoute);
