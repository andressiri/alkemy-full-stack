const Sequelize = require('sequelize');
const db = require('../config/postgreDB.js');

const User = db.define('person', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports = User;