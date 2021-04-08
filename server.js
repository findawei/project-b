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

const app = express();

//body parser
app.use(cors());
app.use(express.json());
app.use(decodeIDToken);

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
app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));