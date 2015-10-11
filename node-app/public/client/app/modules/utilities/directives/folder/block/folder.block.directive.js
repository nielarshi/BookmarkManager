angular.module('bm.directives')
.directive('bmFolderBlock', function() {
	return {
		scope : {
			folder : "=folder"
		}, 
		templateUrl : "app/modules/utilities/directives/folder/block/folder.block.template.html"
	}
});