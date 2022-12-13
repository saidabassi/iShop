import mongoose  from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

const connectDB = async () => {
    try {
      await mongoose.connect(
        process.env.DB_URI,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      )
  
      console.log('MongoDB connection SUCCESS')
    } catch (error) {
      console.error('MongoDB connection FAIL')
    }
  }

export default connectDB