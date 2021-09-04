const config = require("../config");
var nodemailer = require("nodemailer");
const path = require("path");

const { EMAIL_PW } = config;
let mailConfig;
let mailOptions;

if (process.env.NODE_ENV === "production") {
  // all emails are delivered to destination
  mailConfig = {
    host: "mail.nowaitlist.co",
    port: 465,
    secure: true,
    auth: {
      user: "info@nowaitlist.co",
      pass: `${EMAIL_PW}`,
    },
  };
} else {
  // all emails are catched by ethereal.email
  mailConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "winona.ullrich67@ethereal.email",
      pass: "YZAzVVqeyxE38YfaEp",
    },
  };
}

let transport = nodemailer.createTransport(mailConfig);

module.exports = {
  transport,
  mailOptions,
};
