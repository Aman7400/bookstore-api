import config from '../config';
import { connect } from 'mongoose';

const connectDB = async () => {
  try {
    const res = await connect(config.MONGODB_URI);
    console.log('Database connected successfully - ', res.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDB };
