const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();

module.exports = () => {
  if (process.env.NODE_ENV === 'development') {
    const localPostgreDB = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USERNAME,
      process.env.DB_PASSWORD,
      {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: 0,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
      },
    });
    return localPostgreDB;
  };

  if (process.env.NODE_ENV === 'production') {
    const herokuPostgreDB = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      protocol: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });
    return herokuPostgreDB;
  };
};