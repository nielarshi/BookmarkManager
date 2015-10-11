var mongoose = require('mongoose');
var URL = "mongodb://niel:nielarshi@ds035664.mongolab.com:35664/bm";
var db = mongoose.connection;
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

