var express = require('express'),
    app = express();


// Public files
app.use(express.static('public'));
app.use(express.static('app'));

app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

var server = app.listen(process.env.PORT || 5555, function() {
    console.log('Listening on port %d', server.address().port);
  });