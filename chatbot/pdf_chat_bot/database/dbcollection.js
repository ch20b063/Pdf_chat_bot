import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const dbcollection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1); 
  }
};

export default dbcollection;
