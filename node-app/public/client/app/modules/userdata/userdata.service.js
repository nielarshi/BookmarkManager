angular.module('bm.services')
.factory('UserDataService', function($http, $q, URLs, DataNotifier) {
	var UserData = 
		{ 
			is_local : true,
			username : "nielarshi",
			fullname: "Kumar Nielarshi", 
			email: "nielarshi@gmail.com", 
			"is_active": true, 
			bookmarks : [], 
			folders : []
		};
	var getRemoteUserData = function() {
		return $http.get(URLs.userdata)
				.then(function(result) {
					console.log("User data fetched ",result);
					if(result && result.data && result.data.status) {
						UserData = result.data.result[0];

						return UserData;
					} else {
						return $q.reject(result.data);
					} 
				}, function(error) {
					return $q.reject(result.data);
				});
	}

	var sync = function(options) {
		console.log("User data", UserData);
		//once synced, notify
		DataNotifier.notify();
	};

	var syncAll = function() {
		return $http.post(URLs.userdata, UserData)
				.then(function(result) {
					if(result && result.data && result.data.status) {
						return result.data;
					} else {
						return $q.reject(result.data);
					} 
				}, function(error) {
					return $q.reject(result.data);
				});
	};

	var getAllBookmarks = function() {
		return UserData.bookmarks;
	};

	return {
		getRemoteUserData : getRemoteUserData,
		getUserData : function() {
			return UserData;
		},
		getAllBookmarks : getAllBookmarks,
		sync : sync,
		syncAll : syncAll
	}
});