var express = require('express');
var jade = require('jade');
var stylus = require('stylus');
var nib = require('nib');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/jadeapp');
var bodyParser = require('body-parser')

var port = 3000;

// init express
var app = express();
console.log('Express initialized!');

function compile(str, path) {
	return stylus(str)
	.set('filename', path)
	.use(nib())
}

// set up views folder
app.set('views', __dirname + '/views');
// init jade
app.set('view engine', 'jade');
console.log('Jade initilaized!');

// Stylus Middleware
// app.use(express.logger('dev'));
// app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
// app.use(express.methodOverride());
// app.use(express.cookieParser('secret'));
// app.use(express.session());
// app.use(app.router);
app.use(stylus.middleware(
	{
		src:__dirname + '/public',
		compile: compile
	}
));

// set static folder
app.use(express.static(__dirname + '/public'));

// render index
app.get('/', routes.index);
app.get('/userlist', routes.userlist(db));
app.post('/adduser', routes.adduser(db));

// listen on the port
app.listen(port);
console.log('Connected to port ' + port);