const Sequelize = require('sequelize');
const db = require('../config/postgreDB.js');

const Record = db.define('records', {
  record_uuid: {
    type: Sequelize.UUID,
    allowNull: false,
    primaryKey: true
  },
  concept: {
    type: Sequelize.STRING,
    allowNull: false
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  operation_date: {
    type: Sequelize.DATEONLY,
    allowNull: false
  },
  operation_type: {
    type: Sequelize.STRING,
    allowNull: false
  },
  category: {
    type: Sequelize.STRING,
  }
});

module.exports = Record;