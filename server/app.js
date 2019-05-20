const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postRoutes = require('./routes/post');

const app = express();
const mongoPath = `mongodb+srv://val1991:David2005+@cluster0-cn6ti.mongodb.net/test?retryWrites=true`; // add own cluster

mongoose.connect(
    mongoPath,
    { useNewUrlParser: true },
    )
  .then(() => {
    console.log('Connected to database!');
  })
  .catch(() => {
    console.log('Connection failed!')
  });
  
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, PUT, OPTIONS",
    )
    next();
  });

app.use('/api/post', postRoutes);

module.exports = app;