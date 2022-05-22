// Package Imports
const express = require('express')

const SERVER_PORT = process.env.PORT || 5000;

// Constants
const app = express();

// Body Parser to handle json data
app.use(express.json()); //application/json

// Body Parser to handle form data (text Only)
app.use(express.urlencoded({ extended: false }));


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