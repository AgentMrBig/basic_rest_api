require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const routes = require('./routes/routes');
const passwordRoutes = require('./routes/password');

const app = express();
const port = process.env.PORT || 5555;
console.log(process.env.PORT);

// update express settings
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.CORS_ORIGIN }));

// require passport auth
require('./auth/auth');

// setup routes
app.use('/', routes);
app.use('/', passwordRoutes);

// catch all other routes
app.use((request, response) => {
  response.status(404).json({ message: '404 - not found', status: 404 });
});

// handle errors
app.use((error, request, response, next) => {
  response
    .status(error.status || 500)
    .json({ error: error.message, status: 500 });
});

app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
