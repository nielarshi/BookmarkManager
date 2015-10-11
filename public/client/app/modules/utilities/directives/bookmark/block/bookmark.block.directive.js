angular.module('bm.directives')
.directive('bmBookmarkBlock', function() {
	return {
		scope : {
			bookmark : "=bookmark"
		}, 
		templateUrl : "app/modules/utilities/directives/bookmark/block/bookmark.block.template.html"
	}
});