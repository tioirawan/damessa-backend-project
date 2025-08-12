import { Sequelize } from 'sequelize';
import { config } from '../config/config';

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password,
  {
    host: config.db.host,
    port: config.db.port,
    dialect: 'mysql',
    logging: config.env === 'development' ? console.log : false,
  },
);

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
  } catch (error) {
    console.error('Cant connect to the database:', error);
    process.exit(1);
  }
};

export default sequelize;
