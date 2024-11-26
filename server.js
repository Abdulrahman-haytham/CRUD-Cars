const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();

const path=require('path');

const app = express();

// Middleware
app.use(logger('dev'));
app.use(express.json());

// Routers
const carRouter = require('./routes/car.routes');
const userRouter = require('./routes/user.routes');
const sectionRouter = require('./routes/section.routes');
const uploadRoutes = require('./routes/upload.routes');
app.use('/api/cars', carRouter);
app.use('/api/users',userRouter);
app.use('/api/sections', sectionRouter);
app.use('/api/uploads', uploadRoutes);

app.use(express.static(path.join(__dirname, 'dist')));
app.use('/uploads',express.static('uploads'));


// Handle invalid routes
app.use('*', (req, res) => res.status(400).json({ message: "Invalid API endpoint" }));

// Connect to the database
mongoose.connect(process.env.MONGOURL)
   .then(res => {
      console.log("Connection is successful to =>>>>>>>>   " + process.env.MONGOURL);
      app.listen(process.env.PORT, () => console.log("App is listening on port  ==>>>>>>>>>   " + process.env.PORT));
   })
   .catch(err => {
      console.error(err.message);
   });
