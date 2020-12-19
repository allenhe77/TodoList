// Third Party Packages
const express = require ('express');
const dotenv = require ('dotenv');

// middleware
dotenv.config ({path: './config/config.env'});

// init of express app
const app = express ();

app.get ('/', (req, res) => {
  res.send ('Hello World!');
});

// Port Env
const port = process.env.PORT || 3000;

app.listen (port, () => {
  console.log (`Example app listening at http://localhost:${port}`);
});
