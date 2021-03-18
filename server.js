const express = require('express');
const mongoose = require('mongoose');
const decodeIDToken = require('./middleware/auth');

const items = require('./routes/api/items')
const users = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const cors = require('cors');

const app = express();

//body parser
app.use(cors());
app.use(express.json());
app.use(decodeIDToken);

//DB config
const db = require('./config/keys').mongoURI;

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

const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Server started on port ${port}`));