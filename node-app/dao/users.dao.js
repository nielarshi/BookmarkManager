var mongoose = require('mongoose');
var MongooseInstance = require('./../mongo/mongo.helper').getInstance();

//Schemas
var usersSchema;

//Models
var Users;

//referralSchema & Referal
usersSchema = new mongoose.Schema({ 
	any: mongoose.Schema.Types.Mixed
}, { strict : false });
Users = mongoose.model('users', usersSchema);

var insert = function(dataToBeInserted, callback) {
	if(MongooseInstance) {
		console.log(dataToBeInserted);
		var data = new Users(dataToBeInserted);
		Users.update({ _id : dataToBeInserted._id }, dataToBeInserted, function(err, dataReturned) {
			console.log(err, dataReturned);
			if(err) {
				callback({ result : "Some error occurred", status : false });
			} else {
				callback({ result : "success" , status : true });
			}
		});
	} else {
		callback({ result : "Some error occurred with db", status : false });
	}
};

var getAll = function(callback) {
	if(MongooseInstance) {
		Users.find({}, function(err, data) {
			if(err) {
				callback({ result : "Some error occurred", status : false });
			} else {
				callback({ result : data , status : true });
			}
		});
	} else {
		callback({ result : "Some error occurred with db", status : false });
	}
};

var get = function(id, callback) {
	if(MongooseInstance) {
		Users.find({ _id : id }, function(err, data) {
			if(err) {
				callback({ result : "Some error occurred", status : false });
			} else {
				callback({ result : data , status : true });
			}
		});
	} else {
		callback({ result : "Some error occurred with db", status : false });
	}
};

module.exports = {
	insert : insert,
	getAll : getAll,
	get : get
}