import mongoose from 'mongoose';

export const connectToDB = async (DB = '') => {
  await mongoose
    .connect(DB)
    .then(() => {
      console.log('Successfully connected to database');
    })
    .catch((error) => {
      console.log('database connection failed. exiting now...');
      console.error(error);
      process.exit(1);
    });
};
