import express from 'express';
process.loadEnvFile();

// const app = express();

// app.listen(process.env.PORT, () => {
// console.log(`Server is running on port ${process.env.PORT}`);
// });


export const ENV = {
  PORT: process.env.PORT || 5001,
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
};