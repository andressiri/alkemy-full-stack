const express = require('express');
const dotenv = require('dotenv').config();

const app = express();

// @/api router
app.use('/api', require('./routes/router.js'));

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));