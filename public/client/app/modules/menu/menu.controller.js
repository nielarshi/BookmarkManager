angular.module('bm.controllers')
.controller('MenuCtrl', function(
	$scope,
	ContextualService,
	DataNotifier,
	UserDataService
) {

	var resetOptions = function() {
		$scope.addBookmarkSelected = false;
		$scope.addFolderSelected = false;
		$scope.syncing = false;
	};

	$scope.addBookmark = function() {
		resetOptions();
		$scope.addBookmarkSelected = true;
	};

	$scope.addFolder = function() {
		resetOptions();
		$scope.addFolderSelected = true;
	};

	$scope.disposeAll = function() {
		resetOptions();
	};

	$scope.breadcrumbs = [];

	ContextualService.observeContextualHierarchy().then(null, null, function(contextualHierarchy){
    	$scope.breadcrumbs = contextualHierarchy;
	})

	$scope.changeContext = function(breadcrumb) {
		ContextualService.updateContext(breadcrumb);
	};

	DataNotifier.observe()
	.then(null, null, function() {
		$scope.disposeAll();
	})

	$scope.syncUserData = function() {
		$scope.syncing = true;
		UserDataService.syncAll()
		.then(function(result) {
			if(result=='success') {
				$scope.disposeAll();
			} else {
				$scope.disposeAll();
			}
		}, function() {
			$scope.disposeAll();
		});
	};

	$scope.showHelp = function() {
		$scope.helpClicked = true;
	};

	$scope.hideHelp = function() {
		$scope.helpClicked = false;
	};


});