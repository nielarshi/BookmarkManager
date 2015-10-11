angular.module('bm.controllers')
.controller('FolderFormController', function(
	$scope, 
	ModelCreator,
	FolderService
) {
	$scope.folder = {};

	$scope.saveFolder = function() {
		var folder = ModelCreator.createFolder($scope.folder);
		console.log(folder);

		//add to userdata using FolderService
		FolderService.addFolder(folder);
	}

});