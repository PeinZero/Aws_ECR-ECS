// Package Imports
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();


import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SERVER_PORT = process.env.PORT || 5000;

// Routes Imports


// Constants
const app = express();

// Body Parser to handle json data
app.use(express.json()); //application/json

// Body Parser to handle form data (text Only)
app.use(express.urlencoded({ extended: false }));


// Setting up Static Folders
app.use(express.static(path.join(__dirname, 'public')));
/**
  The reason for doing this is because express assumes that the files in images folder are served as they were
  in the root folder. In our case we are looking in http://localhost:5000/images instead of http://localhost:5000/.
*/
app.use('/images', express.static(path.join(__dirname, 'images')));

// Handling CORS Error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// <------------ Incoming requests flow from top to bottom. ------------>
//Routes

app.use('/', (req, res, next) => {
  res.status(200).json({app: "working"})
})

// response for any unknown api request
app.use((error, req, res, next) => {
  console.log(error);
  const statusCode = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(statusCode).json({ message: message, data: data });
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running on Port ${SERVER_PORT}`);
});