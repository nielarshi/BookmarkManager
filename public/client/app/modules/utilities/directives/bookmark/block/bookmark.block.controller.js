angular.module('bm.controllers')
.controller('BookmarkBlockController', function(
	$scope,
	SelectionNotifier,
	ModelType
) {
	console.log('Bookmark Block ', $scope.folder);

	$scope.selectedBookmark;
	SelectionNotifier.observeSelection()
	.then(null, null, function(selected) {
		if(!selected) {
			$scope.selectedBookmark = false;
		} else if(selected.type==ModelType.BOOKMARK) {
			$scope.selectedBookmark = selected;
		}
	});

	$scope.openUrl = function(bookmark) {
		SelectionNotifier.selectOption("open", ModelType.BOOKMARK);
	};

	$scope.editBookmark = function(bookmark) {
		SelectionNotifier.selectOption("edit", ModelType.BOOKMARK);
	};

	$scope.deleteBookmark = function(bookmark) {
		SelectionNotifier.selectOption("delete", ModelType.BOOKMARK);
	};
});