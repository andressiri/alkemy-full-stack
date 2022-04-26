const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware.js');

const app = express();

// Database
const db = require('./config/postgreDB.js');
  // Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log ('DB Error: ' + err));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @/api router
app.use('/api/v1', require('./routes/router.js'));

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));