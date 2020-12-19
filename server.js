// Third Party Packages
const express = require ('express');
const dotenv = require ('dotenv');

// middleware
dotenv.config ({path: './config/config.env'});

// routes
const users = require('./routes/UserRoutes');

// init of express app
const app = express ();

app.use('/api/v1/users', users);

app.get ('/', (req, res) => {
  res.send ('Hello World!');
});

// Port Env
const port = process.env.PORT || 3000;

app.listen (port, () => {
  console.log (`Example app listening at http://localhost:${port}`);
});
