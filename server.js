var express = require("express");
var bodyParser = require("body-parser");
var MongoHelper = require("./mongo/mongo.helper");
var UsersRouter = require('./router/users.router');

var path = require('path');
var mime = require('mime');

var app = express();

//connect to mongodb
MongoHelper.connect();

//start server
app.set('port', process.env.PORT || 5000);

var server = app.listen(app.get('port'), function() {
	console.log('Server started');
});

app.use(bodyParser.urlencoded({ extended : true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/client/')); 

app.use('/users', UsersRouter);

app.use('/', function(req, res) {
	res.sendFile(path.join(__dirname,'/public/client/index.html'));
});

app.use('/client/app/*', function(req, res) {
	console.log('asked for file');
	// mime type
	var type = mime.lookup(path);
	// header fields
	if (!res.getHeader('content-type')) {
  		var charset = mime.charsets.lookup(type);
  		res.setHeader('Content-Type', type + (charset ? '; charset=' + charset : ''));
	}
})

module.exports = app;
