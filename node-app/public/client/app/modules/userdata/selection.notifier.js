angular.module('bm.services')
.factory('SelectionNotifier', function(
	$q
) {
	//for notifying observers
	var objectDefer = $q.defer();
	var optionDefer = $q.defer();

	var selectedObjects = [];
	
	var addToSelectedObjects = function(object) {
		selectedObjects.push(object);
		objectDefer.notify(object);
	}

	var observeSelection = function() {
		return objectDefer.promise;
	};

	var observeOptionSelection = function() {
		return optionDefer.promise;
	};

	var selectOption = function(option, type) {
		optionDefer.notify({option : option, type : type});
	}

	return {
		observeSelection : observeSelection,
		addToSelectedObjects : addToSelectedObjects,
		observeOptionSelection : observeOptionSelection,
		selectOption : selectOption
	}

});
