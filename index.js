// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204
var bodyParser = require('body-parser')
app.use(bodyParser.json() );      
app.use(bodyParser.urlencoded({     
  extended: true
})); 


// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/:date?', (req, res) => {
  const inputDate = req.params.date;

  if (!inputDate) { // Handle empty date parameter
    const now = new Date();
    res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
    return;
  }

  try {
    // Validate date using new Date() and catch errors
    const date = new Date(inputDate);
    const unixTimestamp = date.getTime();
    const utcString = date.toUTCString();

    res.json({
      unix: unixTimestamp,
      utc: utcString
    });
  } catch (error) { // Handle invalid date string
    res.json({ error: "Invalid Date" });
  }
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
