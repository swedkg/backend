const express = require('express')
const app = express();
const axios = require('axios');
var bodyParser = require("body-parser");

app.use(express.static('public'))

var server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://dg.inlectus.com");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var user_id = process.env.USER_ID;

axiosInstance = axios.create({
  method: 'POST',
  url: 'https://api.emailjs.com/api/v1.0/email/send',
  timeout: 25000
})

app.post("/endpoint", function (req, res) {

  var emailData = req.body;
  emailData.user_id = user_id;

  axiosInstance({
    data: emailData,
  }).then(function (response) {
    res.status(200).send('email sent');
  })
    .catch(function (err) {
      console.log('err', err)
    });

  console.log("request received!");
});

console.log("server initialized");