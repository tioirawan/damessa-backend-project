import app from './app';
import { config } from './config/config';
import { connectDB } from './database';

const startServer = async () => {
  try {
    await connectDB();

    app.listen(config.port, () => {
      console.log(`server is running on port ${config.port}`);
      console.log(`🔗 Access it at http://localhost:${config.port}`);
    });
  } catch (error) {
    console.error('failed to start server:', error);
    process.exit(1);
  }
};

startServer();
