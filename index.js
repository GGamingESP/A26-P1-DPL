// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function ( req, res ) {
  let fecha = req.params.date ;
  if(fecha){
    // comprobar si es una fecha
    if(Date.parse(fecha)){
      let date = new Date(fecha);
      let unixDate = date.getTime();
      let utcDate = date.toUTCString();
      res.json({unix: unixDate, utc: utcDate})
    }else{
      res.json({"error": "Invalid Date"})
    }
  }else {
    // devolver fecha actual en UNIX y UTC
    let currentDate = Date.now();
    let currentDateUTC = Date.toISOString()
    res.json({unix: currentDate, utc: currentDateUTC});
  }
})


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
