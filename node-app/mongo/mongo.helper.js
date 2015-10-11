var mongoose = require('mongoose');
var URL = "mongodb://127.0.0.1:27017/bm";
var db = mongoose.connection;

db.on('error', console.error);
db.once('open', function() {
  	console.log("Connected with DB");
});
var connect = function() {
	mongoose.connect(URL, function() {
		console.log("Connected with DB callback");
	});
};

module.exports = {
	connect : connect,
	getInstance : function() {
		return db;
	}
};

