const { createLogger, format, transports } = require('winston');
var path = require('path');
require('winston-mongodb');
const config =require( '../config');


const { MONGO_URI, MONGO_DB_NAME } = config;
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

//Server Logs
module.exports = createLogger({
transports: [
// File transport
    new transports.File({
    filename: path.join(__dirname, '/logs/server.log'),
    format:format.combine(
        format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
        format.align(),
        format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
    )}),

// MongoDB transport
    new transports.MongoDB({
    level: 'error',
    //mongo database connection link
    db : db,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
    // A collection to save json formatted logs
    collection: 'server_logs',
    format: format.combine(
    format.timestamp(),
    // Convert logs to a json format
    format.json())
    })
    ] 
});