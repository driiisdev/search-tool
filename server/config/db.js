const mongoose = require('mongoose');
require('dotenv').config();

/**
 * Make connection with the mongodb database by getting the host and DB name
 * from environment variables
 */

const connectDB = async () => {
  try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`Connected to MongoDb...: ${connection.connection.host}`);
  } catch (error) {
      console.log(`Error in connecting to mongoDB: ${error.message}`);
      process.exit(1)
  }
}; 

module.exports = connectDB;
