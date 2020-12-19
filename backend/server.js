// Third Party Packages
const express = require ('express');
const dotenv = require ('dotenv');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');

// config
dotenv.config ({path: './config/config.env'});

// routes
const users = require('./routes/UserRoutes');

// init of express app
const app = express ();

// middleware
app.use(bodyparser.json());

// app routes
app.use('/api/v1/users', users);

app.get ('/', (req, res) => {
  res.send ('Hello World!');
});

// Port Env
const port = process.env.PORT || 3000;
const db_url = process.env.DB_URL || 'error';

mongoose.connect(db_url)
  .then(() => console.log('Connected to mongodb...'))
  .catch(err => console.error('Error in connecting to MongoDb\n', err));

app.listen (port, () => {
  console.log (`Example app listening at http://localhost:${port}`);
});
