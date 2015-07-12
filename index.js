var express = require('express'),
    app = express();


app.get('/public');

var server = app.listen(process.env.PORT || 5555, function() {
    console.log('Listening on port %d', server.address().port);
  });