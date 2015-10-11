var express = require('express');
var UsersDao = require('./../dao/users.dao');

var UsersRouter = express.Router();

UsersRouter.get('/', function(req, res) {
	UsersDao.getAll(function(result) {
		console.log("Router result", result);
		res.json(result);
	});
});

UsersRouter.post('/', function(req, res) {
	var dataToBeInserted = req.body;
	console.log(dataToBeInserted);
	UsersDao.insert(dataToBeInserted, function(result) {
		console.log("Router result", result);
		res.json(result);
	});
});

UsersRouter.post('/:id', function(req, res) {
	UsersDao.get("", function(result) {
		console.log("Router result", result);
		res.json(result);
	});
});

module.exports = UsersRouter;