const express = require('express');
const app = express();
const mongose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');

//init env
dotenv.config();

//Connect to DB
mongose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log('connected to db!')
);

//Middleware
app.use(express.json());

//Route middlware
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('Server up and running'));
