var express = require('express');
var path = require('path');
var app = express();

// app.use(express.static(path.join(__dirname, 'public')));

// Listen for requests
// var server = app.listen(app.get('port'), function() {
//   var port = server.address().port;
//   console.log('Magic happens on port ' + port);
// });

// app.use(express.static('public'));
app.get('/', (req, res) => {
	res.send({hi: 'there'})
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);
