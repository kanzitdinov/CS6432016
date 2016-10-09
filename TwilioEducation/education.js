var express = require('express');
var bodyParser = require('body-parser');

var opts = {};
var wolfram = require('wolfram-alpha').createClient("9346W8-VLY4G9E45T", opts);

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: false }));

// Twilio Credentials
var accountSid = 'AC730072f510341b8e630a68dc2b400f80';
var authToken = 'db0884fabd970e29b3c00973f6d71b89';
var client = require('twilio')(accountSid, authToken);

// REQUEST TO WOLFRAM ALPHA
app.post('/waeducation', function(req, res) {
  // console.log(req.query);
  var msgFrom = req.body.From;
  var msgBody = req.body.Body;

  console.log('+' + msgBody.slice(0, 5) + '+ +' + (msgBody.slice(0, 5) == 'MATH '));

  if (msgBody.slice(0, 5) == 'MATH ') {
    msgBody = msgBody.slice(5);

    // TODO: ALSO SAVE IN DATABASE TO GET RESULTS FASTER

    console.log(msgFrom);
    console.log(msgBody);

    var query = msgBody;
    wolfram.query(query, function (err, result) {
      // if (err) throw err;
      if (err) res.send(`<h1>Error</h1>`);

      var resultString = '';
      for (var i = 0; i < result.length; i++) {
        var r = result[i];
        console.log(r);
        if (r.primary) {
          resultString += r.title + ':\n' + r.subpods[0].text + '\n\n';
        }
      }
      resultString = resultString.slice(0, -2);

      console.log("Result: %j", resultString);

      client.messages.create({
      	from: "+19177464171",
        to: msgFrom,
        body: resultString
      }, function(err, message) {
      	if(err) {
          console.error(err.message);
          res.send(err.message);
        } else {
          res.send(`Message is sent to ${msgFrom}`);
        }
      });

      // console.log("Result: %j", resultString);
      // res.send(`<h1>${resultString}</h1>`);
    });
  } else {

    console.error('Can\'t make a request with -> ' + msgBody);
    res.send('Can\'t make a request with -> ' + msgBody);

  }

})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
