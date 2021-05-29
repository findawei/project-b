const express = require('express');
const mongoose = require('mongoose');
const decodeIDToken = require('./middleware/auth');
const path =require('path');
const cors = require('cors');
const config =require( './config');
const stripe = require('./routes/api/stripe')
const items = require('./routes/api/items')
const users = require("./routes/api/users");
const email = require('./email/email')
const authRoutes = require("./routes/api/auth");
const companion = require('@uppy/companion')
const session = require('express-session')
const fs = require('fs')
const AWS = require('aws-sdk');
const multiparty = require('multiparty');
const fileType = require('file-type');
const sgMail = require('@sendgrid/mail')

const DATA_DIR = path.join(__dirname, 'tmp')

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

//Connect on PORT
const { PORT } = config;
const server = app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));

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

// const { SENDGRID_API_KEY } = config;

// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// const msg = {
//   to: 'alex@nowaitlist.co', // Change to your recipient
//   from: 'alex@nowaitlist.co', // Change to your verified sender
//   subject: 'Sending with SendGrid is Fun',
//   text: 'and easy to do anywhere, even with Node.js',
//   html: '<strong>and easy to do anywhere, even with Node.js</strong>',
// }
// sgMail
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })