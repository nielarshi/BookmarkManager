angular.module('bm.services')
.factory('ContextualService', function(
	UserDataService,
	$q
) {
	//for notifying observers
	var defer = $q.defer();

	var CurrentContext = [];
	var CurrentContextHierarchy = [];

	var Context = function(id, name) {
		this.id = id;
		this.name = name;
	}

	var addToContextHierarchy = function(id, name) {
		CurrentContextHierarchy.push(new Context(id, name));
		defer.notify(CurrentContextHierarchy);
	}

	var addToContext = function(folder) {
		CurrentContext.push(folder);
		addToContextHierarchy(folder._id, folder.name);
	};

	var getContextualHierarchyData = function() {
		return CurrentContextHierarchy;
	};

	var observeContextualHierarchy = function() {
		return defer.promise;
	};

	var removeLastFromContext = function() {
		CurrentContext.pop();
		CurrentContextHierarchy.pop();
		defer.notify(CurrentContextHierarchy);
	};

	var updateContext = function(selectedContext) {
		var newHierarchy = [];
		var found = false;
		angular.forEach(CurrentContextHierarchy, function(context) {
			if(!found) {
				newHierarchy.push(context);
				if(context.id===selectedContext.id) {
					found = true;
				}
			}
		});
		if(CurrentContextHierarchy.length!=newHierarchy.length) {
			CurrentContextHierarchy = newHierarchy;
			if(CurrentContextHierarchy.length===1) {
				CurrentContext = [];
			} else {
				CurrentContext.slice(0, CurrentContextHierarchy.length-1);
			}
			
			console.log("New hierarchy ", CurrentContextHierarchy, CurrentContext);
			defer.notify(CurrentContextHierarchy);
		} 

	};

	var getContextualData = function() {
		return $q(function(resolve, reject) {
			setTimeout(function() {
				var data = {
					name : [],
					folders : [],
					bookmarks : []
				};

				console.log("Changing context", CurrentContext);

				if(CurrentContext.length === 0) {
					var userData = UserDataService.getUserData();
					console.log("Context ",userData);
					if(userData && !userData.is_local) {
						resolve(true);
					} else {
						UserDataService.getRemoteUserData()
						.then(function(userdata) {
							resolve(true);
						}, function(error) {
							reject(error);
						});
					}
					
				} else {
					var currentContextualFolder = CurrentContext[CurrentContext.length-1];
					console.log('Last added : ', currentContextualFolder);
					if(currentContextualFolder) {
						
					}
					resolve(true);
				}
			}, 500);
		});
	};

	return {
		getContext : function() {
			return CurrentContext;
		},
		getContextHierarchy : function() {
			return CurrentContextHierarchy;
		},
		observeContextualHierarchy : observeContextualHierarchy,
		getContextualData : getContextualData,
		getContextualHierarchyData : getContextualHierarchyData,
		addToContext : addToContext,
		addToContextHierarchy : addToContextHierarchy,
		removeLastFromContext : removeLastFromContext,
		updateContext : updateContext
	}
});