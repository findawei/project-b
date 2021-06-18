const express = require('express');
const { RateLimiterMongo } = require('rate-limiter-flexible');
const mongoose = require('mongoose');
const decodeIDToken = require('./middleware/auth');
const path =require('path');
const cors = require('cors');
const config =require( './config');
const stripe = require('./routes/api/stripe')
const items = require('./routes/api/items')
const users = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const session = require('express-session')
const fs = require('fs')
// const AWS = require('aws-sdk');
// const multiparty = require('multiparty');
const fileType = require('file-type');
const sgMail = require('@sendgrid/mail')
const DATA_DIR = path.join(__dirname, 'tmp')
const {serverLogger} = require('./logger/logger')
const helmet = require("helmet");
var toobusy = require('toobusy-js');


const app = express();

app.use(express.json());
app.use(decodeIDToken);
app.use(helmet());



//DB config
const { MONGO_URI, MONGO_DB_NAME } = config;
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

//Connect to mongo
mongoose
    .connect(db,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then(()=> console.log('MongoDB connected...'))
    .catch(err => console.log(err));

const mongoConn = mongoose.connection;

const opts = {
  storeClient: mongoConn,
  points: 10, // Number of points
  duration: 1, // Per second(s)
};
const rateLimiterMongo = new RateLimiterMongo(opts);
const rateLimiterMiddleware = (req, res, next, err) => {
  rateLimiterMongo.consume(req.ip)
      .then(() => {
        next();
      })
      .catch(() => {
        res.status(429).send('Too Many Requests');
        serverLogger.error(`${err.status || 429} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
      });
  };
app.use(rateLimiterMiddleware)

//Use Routes
app.use('/api/items', items)
// app.use('/api/users', users)
app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripe)

// Capture 500 errors
app.use((err,req,res,next) => {
res.status(500).send('Something went wrong.');
serverLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req,res,next) => {
res.status(404).send("Page not found.");
serverLogger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

//Connect on PORT
const { PORT, HOST} = config;
const server = app.listen(PORT, ()=> {
    console.log(`Server started and running on http://${HOST}:${PORT}`);
    serverLogger.info(`Server started and running on http://${HOST}:${PORT}`);
});