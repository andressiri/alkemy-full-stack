const Sequelize = require('sequelize');
const db = require('../config/postgreDB.js');

const User = db.define('person', {
  user_uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
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
  verified: {
    type: Sequelize.BOOLEAN,
  }
});

module.exports = User;