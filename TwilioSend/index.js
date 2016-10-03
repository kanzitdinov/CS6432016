var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));

// RECEIVING MESSAGE
app.post('/message', function(req, res) {
  console.log(req.body);
  var msgFrom = req.body.From;
  var msgBody = req.body.Body;

  res.send(`
    <Response>
      <Message>
        Hello ${msgFrom}. You said: ${msgBody}
      </Message>
    </Response>
  `)
})

// SENDING MESSAGE
// Twilio Credentials
var accountSid = 'AC730072f510341b8e630a68dc2b400f80';
var authToken = 'db0884fabd970e29b3c00973f6d71b89';
var client = require('twilio')(accountSid, authToken);

app.get('/sendMessage', function(req, res) {
  // var number_to_check = '+19292168151'
  var number = '+19292168151';

  console.log(number);

  client.messages.create({
    from: "+19177464171",
    to: number,
    body: "Hello from Batyr Kanzitdinov 🙂"
  }, function(err, message) {
    if(err) {
      console.error(err.message);
    } else {
      res.send(`Message is sent to ${number}`);
    }
  });

})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
