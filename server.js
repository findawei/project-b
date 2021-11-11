const express = require("express");
const { RateLimiterMongo } = require("rate-limiter-flexible");
const mongoose = require("mongoose");
const { decodeIDToken, decodeSocketToken } = require("./middleware/auth");
const path = require("path");
const cors = require("cors");
const config = require("./config");
const stripe = require("./routes/api/stripe");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const authRoutes = require("./routes/api/auth");
const session = require("express-session");
const fs = require("fs");
// const AWS = require('aws-sdk');
// const multiparty = require('multiparty');
const fileType = require("file-type");
// const sgMail = require('@sendgrid/mail')
const DATA_DIR = path.join(__dirname, "tmp");
const { serverLogger } = require("./logger/logger");
var toobusy = require("toobusy-js");
var hpp = require("hpp");
var nodemailer = require("nodemailer");
const helmet = require("helmet");

const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

app.use(express.json());
app.use(decodeIDToken);

app.use(express.urlencoded({ extended: false }));
app.use(hpp()); // <- THIS IS THE NEW LINE
app.use(cors());

//DB config
const { MONGO_URI, MONGO_DB_NAME } = config;
const db = `${MONGO_URI}/${MONGO_DB_NAME}`;

//Connect to mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const mongoConn = mongoose.connection;

const opts = {
  storeClient: mongoConn,
  points: 10, // Number of points
  duration: 1, // Per second(s)
};
const rateLimiterMongo = new RateLimiterMongo(opts);
const rateLimiterMiddleware = (req, res, next, err) => {
  rateLimiterMongo
    .consume(req.ip)
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).send("Too Many Requests");
      serverLogger.error(
        `${err.status || 429} - ${res.statusMessage} - ${err.message} - ${
          req.originalUrl
        } - ${req.method} - ${req.ip}`
      );
    });
};
app.use(rateLimiterMiddleware);

// //For security -> doesn't work on heroku
// app.use(helmet());

//Use Routes
app.use("/api/items", items);
// app.use('/api/users', users)
app.use("/api/auth", authRoutes);
app.use("/api/stripe", stripe);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Capture 500 errors
app.use((err, req, res, next) => {
  res.status(500).send("Something went wrong.");
  serverLogger.error(
    `${err.status || 500} - ${res.statusMessage} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
});

// Capture 404 erors
app.use((req, res, next) => {
  res.status(404).send("Page not found.");
  serverLogger.error(
    `400 || ${res.statusMessage} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
});

// Have grace under load
app.use(function (req, res, next, err) {
  if (toobusy()) {
    res.send(503, "I'm busy right now, sorry.");
    serverLogger.error(
      `${err.status || 503} - ${res.statusMessage} - ${err.message} - ${
        req.originalUrl
      } - ${req.method} - ${req.ip}`
    );
  } else {
    next();
  }
});

app.get("/", function (req, res) {
  // processing the request requires some work!
  var i = 0;
  while (i < 1e5) i++;
  res.send("I counted to " + i);
});

//Socket
const itemsSocket = require("./routes/api/itemsSocket");

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  // socket.removeAllListeners();
  const token = socket.handshake.auth.token;
  let authUser;
  try {
    authUser = await decodeSocketToken(token);
  } catch (err) {
    socket.emit("auth failed");
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  }
  console.log(`a user connected ${socket.id}`);

  // if (authUser && authUser.uid) {
  itemsSocket(io, socket, authUser);
  // }

  socket.on("disconnect", () => {
    socket.removeAllListeners();
    console.log("user disconnected");
  });
});

//Connect on PORT
const { PORT, HOST } = config;
httpServer.listen(PORT, () => {
  console.log(`Server started and running on http://${HOST}:${PORT}`);
  serverLogger.info(`Server started and running on http://${HOST}:${PORT}`);
});

process.on("SIGINT", function () {
  console.log("\nGracefully shutting down from SIGINT (Ctrl-C)");
  server.close();
  toobusy.shutdown();
  process.exit(1);
});

process.on("uncaughtException", function (req, origin, err) {
  // clean up allocated resources
  // log necessary error details to log files
  serverLogger.error(
    `${(err ? err.status : "") || 503} - 'uncaughtException' - ${
      err ? err.message : ""
    } - ${req.originalUrl} - ${req.method} - ${origin} - ${req.ip}`
  );
  process.exit(); // exit the process to avoid unknown state
});
