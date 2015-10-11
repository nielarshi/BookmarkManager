angular.module('bm.controllers')
.controller('DashboardCtrl', 
	function(
		$scope,
		ContextualService,
		FolderService,
		BookmarkService,
		SelectionNotifier,
		ModelType
  	) {

		$scope.msg = "hello";
		
		var initialiseDataForContext = function() {
			ContextualService.getContextualData()
			.then(function(success) {
				if(success) {
					//populate folders from userdata
					$scope.folders = FolderService.getFolders();
					$scope.bookmarks = BookmarkService.getBookmarksForFolder();
								
					console.log($scope.folders);
				}
			}, function() {
		
			});
		};

		$scope.clearAll = function() {
			//SelectionNotifier.addToSelectedObjects(null);
		};

		ContextualService.addToContextHierarchy('0', 'Home');
		initialiseDataForContext();

		$scope.onDragComplete=function(data,evt){
       		console.log("drag success, data:", data);
    	}
    	$scope.onDropComplete=function(data,evt,folder){
        	console.log("drop success, data:", data);
        	BookmarkService.deleteBookmark(data);
        	ContextualService.addToContext(folder);
        	BookmarkService.addBookmark(data);
        	initialiseDataForContext();
    	}

		$scope.openFolder = function(folder) {
			console.log('double clicked');
			ContextualService.addToContext(folder);
			initialiseDataForContext();
		};

		$scope.openUrl = function(bookmark) {
			window.open(bookmark.url, '_blank')
		}

		$scope.selectFolder = function(folder) {
			$scope.selectedFolder = folder;
			SelectionNotifier.addToSelectedObjects(folder);
			console.log("Selected folder ",$scope.selectedFolder);
		}

		$scope.selectBookmark = function(bookmark) {
			$scope.selectedBookmark = bookmark;
			SelectionNotifier.addToSelectedObjects(bookmark);
			console.log("Selected bookmark ",$scope.selectedBookmark);
		}

		ContextualService.observeContextualHierarchy().then(null, null, function(contextualHierarchy){
    		//alert('changing context');
    		initialiseDataForContext();
		})

		SelectionNotifier.observeOptionSelection()
		.then(null, null, function(options) {
			if(options.type==ModelType.BOOKMARK) {
				if($scope.selectedBookmark) {
					//alert(options.option + " " +$scope.selectedBookmark.title)
					if(options.option==="open") {
						$scope.openUrl($scope.selectedBookmark);
					} else if(options.option==="edit") {

					} else if(options.option==="delete") {
						var r = confirm("Are you sure you want to delete the bookmark?");
						if (r == true) {
    						BookmarkService.deleteBookmark($scope.selectedBookmark);
						} 
					}
				}
			} else if(options.type==ModelType.FOLDER) {
				if($scope.selectedFolder) {
					//alert(options.option + " " +$scope.selectedFolder.name)

					if(options.option==="open") {
						$scope.openFolder($scope.selectedFolder);
					} else if(options.option==="edit") {

					} else if(options.option==="delete") {

						//are you sure you want to delete
						var r = confirm("Are you sure you want to delete folder?");
						if (r == true) {
    						FolderService.deleteFolder($scope.selectedFolder);
						} 
					}

				}
			}
		});
		
});