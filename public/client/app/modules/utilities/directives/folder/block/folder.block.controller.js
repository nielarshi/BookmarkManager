angular.module('bm.controllers')
.controller('FolderBlockController', function(
	$scope,
	SelectionNotifier,
	ModelType
) {
	console.log('Block ', $scope.folder);

	$scope.selectedFolder;
	SelectionNotifier.observeSelection()
	.then(null, null, function(selected) {
		if(!selected) {
			$scope.selectedFolder = false
		} else if(selected.type==ModelType.FOLDER) {
			$scope.selectedFolder = selected;
		}
	});

	$scope.openFolder = function(folder) {
		SelectionNotifier.selectOption("open", ModelType.FOLDER);
	};

	$scope.editFolder = function(folder) {
		SelectionNotifier.selectOption("edit", ModelType.FOLDER);
	};

	$scope.deleteFolder = function(folder) {
		SelectionNotifier.selectOption("delete", ModelType.FOLDER);
	};
});