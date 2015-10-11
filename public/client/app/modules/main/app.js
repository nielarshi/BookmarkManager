var bm = angular.module('bookmarksManager', [
	'bm.controllers',
	'bm.services',
	'bm.utils',
	'bm.directives',
	'ngRoute',
	'ngDraggable'
]);


bm.run(function(UserDataService) {
	
});

bm.config(function($routeProvider) {
	$routeProvider
	.when("/", {
		templateUrl : "app/modules/dashboard/dashboard.template.html",
		controller: "DashboardCtrl"
	})
	
	.otherwise('/');
});