angular.module('bm.services')
.factory('BookmarkService', function(
	UserDataService, 
	FolderService
) {

	var getBookmarksForFolder = function() {
		return FolderService.getCurrentContextFolder().bookmarks;
	};

	var getBookmark = function(bookmarkId) {
		angular.forEach(FolderService.getCurrentContextFolder().bookmarks, function(bookmark, index) {
			if(bookmark._id === bookmarkId) {
				return bookmark;
			}
		});
		return false;
	};

	var getBookmarksForUser = function() {
		var userdata = UserDataService.getUserData();
		return userdata.bookmarks;
	};

	var addBookmark = function(bookmark) {
		FolderService.getCurrentContextFolder().bookmarks.unshift(bookmark);
		UserDataService.sync({
			bookmark : bookmark,
			folderId : ""
		});
	};

	var deleteBookmark = function(bookmark) {
		var bookmarks = FolderService.getCurrentContextFolder().bookmarks;
		angular.forEach(bookmarks, function(bookmarkTemp, index) {
			if(bookmark._id===bookmarkTemp._id) {
				bookmarks.splice(index, 1);
			}
		});
		UserDataService.sync({
			bookmark : bookmark
		});
	}

	var editBookmark = function(bookmark, folderId) {

	};

	return {
		getBookmarksForFolder : getBookmarksForFolder,
		getBookmarksForUser : getBookmarksForUser,
		addBookmark : addBookmark,
		deleteBookmark : deleteBookmark
	}
});