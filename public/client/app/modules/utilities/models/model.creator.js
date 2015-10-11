angular.module('bm.utils')
.factory('ModelCreator', function(ModelType) {
	var Bookmark = function(options) {
		this._id = options.title.split(" ").join("");
		this.type = ModelType.BOOKMARK;
		this.title = options.title ? options.title : "";
		this.url = options.url ? options.url : "";
		this.description = options.description ? options.description : "";
		this.created_on = options.created_on ? options.created_on : "";
		this.deleted_on = options.deleted_on ? options.deleted_on : "";
		this.is_active = options.is_active ? options.is_active : true;
	}

	var Folder = function(options) {
		this._id = options.name.split(" ").join("");
		this.type = ModelType.FOLDER;
		this.name = options.name ? options.name : "";
		this.description = options.description ? options.description : "";
		this.created_on = options.created_on ? options.created_on : "";
		this.deleted_on = options.deleted_on ? options.deleted_on : "";
		this.is_active = options.is_active ? options.is_active : true;
		this.bookmarks = options.bookmarks ? options.bookmarks : [];
		this.folders = options.folders ? options.folders : [];
	}


	var createBookmark = function(options) {
		return new Bookmark(options);
	};

	var createFolder = function(options) {
		return new Folder(options);
	};

	return {
		createBookmark : createBookmark,
		createFolder : createFolder
	}
});