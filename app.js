const express = require('express');
var nodemailer = require('nodemailer');
var bodyParser = require('body-parser');
var path = require('path');

const port = process.env.PORT || 3000 ;
var app = express();


//For using Static files present in a dir when using express
app.use(express.static(__dirname + '/css'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/',(req,res) => {
//Root page to display
res.sendFile(__dirname + '/index.html');

});

//other modules
  app.post('/send-email', function (req, res) {
      console.log(req.body);
      var transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
                   user: 'charanprofilermainwork@gmail.com',
                   pass: 'Main1234'
                 }
      });

      let mailOptions = {
          from: '"Profile Page" <************@gmail.com>', // sender address
          to: '<************@gmail.com>', // list of receivers
          subject: `${req.body.email}`, // Subject line
          text: `${req.body.comments}`, // plain text body
          //html: '<b>NodeJS Email Tutorial</b>' // html body
      };
      transporter.sendMail(mailOptions, (error,info) => {
        if (error) {
                    return console.log(error);
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                  res.redirect('/');
                });

      });



app.listen(port,() => {
  console.log(`Listening on port ${port}`);
});
