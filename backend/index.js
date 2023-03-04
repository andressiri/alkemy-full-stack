const express = require('express');
const dotenv = require('dotenv').config();
const path = require('path');
const session = require('express-session');
const { errorHandler } = require('./middleware/errorMiddleware.js');

const app = express();

// Database
const db = require('./config/postgreDB.js')();
  // Test DB
db.authenticate()
  .then(() => {
    if (process.env.NODE_ENV === 'development')
      console.log('Database connected...')
  })
  .catch(err => {
    if (process.env.NODE_ENV === 'development')
      console.log ('DB Error: ' + err)
  });

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));

// @/api router
app.use('/api/v1', require('./routes/router.js'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './public')));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'public', 'index.html')));
};

app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') 
    console.log(`Server started at port ${PORT}`
  )}
);