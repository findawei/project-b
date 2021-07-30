const config =require( '../../config');
var nodemailer = require('nodemailer');

const { EMAIL_PW } = config;

var transport = nodemailer.createTransport({
  host: "mail.nowaitlist.co",
  port: 465,
  secure: true,
  auth: {
    user: "alex@nowaitlist.co",
    pass: `${EMAIL_PW}`
  }
});

var mailOptions = {
    from: '"No Wait List" <alex@nowaitlist.co>',
    to: `${req.currentUser.email}`,
    cc: "alex@nowaitlist.co",
    subject: 'Nice Nodemailer test',
    text: 'Hey there, it’s our first message sent with Nodemailer ',
    html: '<b>Hey there! </b><br> This is our first message sent with Nodemailer<br /><img src="cid:uniq-mailtrap.png" alt="mailtrap" />',
  };
  
  // transport.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info.messageId);
  // });



module.exports = {
  template,
  mailOptions
};