angular.module('bm.controllers')
.controller('BookmarkFormController', function(
	$scope, 
	ModelCreator,
	BookmarkService
) {
	$scope.bookmark = {};

	$scope.saveBookmark = function() {
		var bookmark = ModelCreator.createBookmark($scope.bookmark);
		console.log(bookmark);

		//add to userdata using BookmarkService
		BookmarkService.addBookmark(bookmark);
	}


});