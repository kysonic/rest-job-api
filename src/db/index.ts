import { Sequelize } from 'sequelize';
import dontenv from 'dotenv';

dontenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',

    logging: process.env.NODE_ENV === 'development' ? console.log : false,

    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  },
);

export default sequelize;
