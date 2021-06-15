const express = require('express');
const mongoose = require('mongoose');
const decodeIDToken = require('./middleware/auth');
const path =require('path');
const cors = require('cors');
const config =require( './config');
const stripe = require('./routes/api/stripe')
const items = require('./routes/api/items')
const users = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const companion = require('@uppy/companion')
const session = require('express-session')
const fs = require('fs')
const AWS = require('aws-sdk');
const multiparty = require('multiparty');
const fileType = require('file-type');
const sgMail = require('@sendgrid/mail')
const DATA_DIR = path.join(__dirname, 'tmp')
const logger = require('./logger/logger')
const user_logger = require('./logger/user_logger')

const app = express();

//body parser
// app.use(require('cors')({
//   origin: true,
//   credentials: true,
// }))

app.use(express.json());
app.use(decodeIDToken);

// app.use(session({
//   secret: 'some-secret',
//   resave: true,
//   saveUninitialized: true,
// }))

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*')
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE'
//   )
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'Authorization, Origin, Content-Type, Accept'
//   )
//   next()
// })

// app.get('/companion', (req, res) => {
//   res.setHeader('Content-Type', 'text/plain')
//   res.send('Welcome to Companion')
// })

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

//Use Routes
app.use('/api/items', items)
// app.use('/api/users', users)
app.use('/api/auth', authRoutes);
app.use('/api/stripe', stripe)


// Capture 500 errors
app.use((err,req,res,next) => {
res.status(500).send('Could not perform the calculation!');
   logger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

// Capture 404 erors
app.use((req,res,next) => {
res.status(404).send("PAGE NOT FOUND");
    logger.error(`400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
})

//Uppy Companion
// const {AWS_KEY, AWS_SECRET, AWS_BUCKET, AWS_REGION, endpoint} = config

// const options = {
//     providerOptions: {
//       s3: {
//         getKey: (req, filename) =>`/${filename}`,
//         key: AWS_KEY,
//         secret: AWS_SECRET,
//         bucket: AWS_BUCKET,
//         region: AWS_REGION,
//         endpoint
//       },
//     },
//     server: { 
//         host: `localhost:${PORT}`, 
//         path: '/companion'
//     },
//     filePath: DATA_DIR,
//     secret: 'blah blah',
//     debug: true,
//   }

// try {
//   fs.accessSync(DATA_DIR)
// } catch (err) {
//   fs.mkdirSync(DATA_DIR)
// }
// process.on('exit', () => {
//   rimraf.sync(DATA_DIR)
// })

// app.use('/companion', companion.app(options))
// companion.socket(server, options)

//Connect on PORT
const { PORT, HOST} = config;
const server = app.listen(PORT, ()=> {
    console.log(`Server started and running on http://${HOST}:${PORT}`);
    logger.info(`Server started and running on http://${HOST}:${PORT}`);
});