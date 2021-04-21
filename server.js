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

const DATA_DIR = path.join(__dirname, 'tmp')

const app = express();

//body parser
app.use(cors({
    methods: ['OPTIONS', 'GET', 'POST', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Uppy-Versions', 'Accept'],
    exposedHeaders: ['Access-Control-Allow-Headers'],
  }));

app.use((req, res, next) => {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Authorization, Origin, Content-Type, Accept'
    )
    next()
  })

app.use(express.json());
app.use(decodeIDToken);

app.use(session({
  secret: 'some-secret',
  resave: true,
  saveUninitialized: true,
}))

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
const {key, secret, bucket, region, endpoint} = config

const options = {
    providerOptions: {
      s3: {
        getKey: (req, filename) =>`/${filename}`,
        key,
        secret,
        bucket,
        region,
        endpoint,
      },
    },
    server: { 
        host: `localhost:${PORT}`, 
        path: '/companion'
    },
    filePath: DATA_DIR,
    secret: 'blah blah',
    debug: true,
  }

try {
  fs.accessSync(DATA_DIR)
} catch (err) {
  fs.mkdirSync(DATA_DIR)
}
process.on('exit', () => {
  rimraf.sync(DATA_DIR)
})

app.use('/companion', companion.app(options))
companion.socket(server, options)