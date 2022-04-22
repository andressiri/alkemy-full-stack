const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// @/api router
app.use('/api/v1', require('./routes/router.js'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));