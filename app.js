var express = require('express');
var jade = require('jade');

var port = 3000;

// init express
var app = express();
console.log('Express initialized!');

// set up views folder
app.set('views', __dirname + '/views');
// init jade
app.set('view engine', 'jade');
console.log('Jade initilaized!');

// set static folder
app.use(express.static(__dirname + '/public'));

// render index
app.get('/', function(req, res){
	res.render('index',
				{title:'Welcome'});
});

// listen on the port
app.listen(port);
console.log('Connected to port ' + port);