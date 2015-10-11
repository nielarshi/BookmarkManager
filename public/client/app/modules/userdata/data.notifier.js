angular.module('bm.services')
.factory('DataNotifier', function(
	$q
) {
	//for notifying observers
	var defer = $q.defer();
	
	var notify = function() {
		defer.notify({});
	}

	var observe = function() {
		return defer.promise;
	};

	return {
		observe : observe,
		notify : notify
	}

});
