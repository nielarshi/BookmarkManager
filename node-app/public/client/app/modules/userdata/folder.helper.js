angular.module('bm.services')
.factory('FolderService', function(
	UserDataService,
	ContextualService
) {

	/*
	 * provides basic folder services based on current context
	 */

	var Folders = [];

	var getCurrentContextFolder = function() {
		var userData = UserDataService.getUserData();

		var contextHierarchy = ContextualService.getContextualHierarchyData();

		var foldersParent = userData;
		if(contextHierarchy.length > 1) {
			angular.forEach(contextHierarchy, function(context, index) {
				if(index > 0) {
					if(foldersParent.folders) {
						angular.forEach(foldersParent.folders, function(folder, index) {
							if(folder._id===context.id) {
								foldersParent = folder;
							}
						})
					} 
				}
			});
		}

		console.log("Folder helper ",contextHierarchy, foldersParent, userData);

		return foldersParent;
	}
	var getFolders = function() {
		return getCurrentContextFolder().folders;
	};

	var getFolder = function(folderId) {
		angular.forEach(getCurrentContextFolder().folders, function(folder, index) {
			if(folder._id === folderId) {
				return folder;
			}
		});
		return false;
	}

	var addFolder = function(folder) {
		getCurrentContextFolder().folders.unshift(folder);
		UserDataService.sync({
			folder : folder
		});
	}

	var deleteFolder = function(folder) {
		var folders = getCurrentContextFolder().folders;
		angular.forEach(folders, function(folderTemp, index) {
			if(folder._id===folderTemp._id) {
				folders.splice(index, 1);
			}
		});
		UserDataService.sync({
			folder : folder
		});
	}

	return {
		getFolder : getFolder,
		getFolders : getFolders,
		addFolder : addFolder,
		deleteFolder : deleteFolder,
		getCurrentContextFolder : getCurrentContextFolder
	}
});