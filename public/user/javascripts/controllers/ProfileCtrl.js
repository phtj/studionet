angular.module('studionet')

.controller('ProfileCtrl', ['$scope', 'ModalService', 'profile', 'contributions', 'tags', 'groups', function($scope, ModalService, profile, contributions, tags, groups){

	/*
	 *	Functionality for User Profile Page
	 */
	$scope.contributionsRef = contributions.contributions.hash();
	$scope.tags = tags.tags;

	// warning: be wary of scope overlaps; wasn't working with $scope.groups
	$scope.user = profile.user;
	$scope.contributions = $scope.user.contributions;
	$scope.groups = groups.groups; console.log($scope.groups);

	$scope.lastLoggedIn = new Date($scope.user.lastLoggedIn);


	$scope.computeStats = function(){

		$scope.views = 0; 
		$scope.rating = 0;
		$scope.level = 0;

		var rateCount = 0;
		for(var i=0; i < $scope.contributions.length; i++){
			$scope.views += $scope.contributions[i].views; 
			$scope.rating += $scope.contributions[i].rating;
			rateCount += $scope.contributions[i].rateCount;  
		}

		$scope.rating = ($scope.rating / rateCount).toFixed(1);

		$scope.level = 0;

		profile.getContributions().then(function(res){

			var data = res.data[0];
			data.map(function(activity){

				if(activity.type == "CREATED")
					$scope.level += 0.2;
				else if(activity.type == "RATED")
					$scope.level += 0.1;
				else if(activity.type == "VIEWED")
					$scope.level += 0.01;

			})

			$scope.level = $scope.level.toFixed(0);

		})

	}

	$scope.close = function() {
	    $('body').removeClass('modal-open');
	    $('.modal-backdrop').remove();
  	};
  
	$scope.uploadPic = function(avatar) {
	    avatar.upload = Upload.upload({
	      url: '/uploads/avatar',
	      data: {username: $scope.username, avatar: avatar},
	    });

	    avatar.upload.then(function (response) {
	      $timeout(function () {
	        avatar.result = response.data;

	         // force a reload for avatar
		      var random = (new Date()).toString();
		      profile.getUser().then(function(){
			      $scope.user.avatar = $scope.user.avatar + "?cb=" + random;
			    });
	      });
	    }, function (response) {
	      if (response.status > 0)
	        $scope.errorMsg = response.status + ': ' + response.data;
	    }, function (evt) {
	      // Math.min is to fix IE which reports 200% sometimes
	      avatar.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
	    });
   	}

   	$scope.updateUser = function(){
   		alert("User Update")
   	}

  	$scope.changeName = function($event){
  		if($event.keyCode==13){
  			profile.changeName($scope.user);
  		}
  	}
 
	$scope.createGroup = function(){

		ModalService.showModal({
		        templateUrl: "/user/templates/createGroupModal.html",
		        controller: "CreateGroupCtrl",
		        scope: $scope
	      }).then(function(modal) {
		        modal.element.modal({
		          backdrop: 'static'
		        });
		        modal.scope.reset();
	      });
	}

	$scope.editProfile = function(){

		ModalService.showModal({
		        templateUrl: "/user/templates/editProfile.html",
		        controller: "ProfileCtrl",
		        scope: $scope
	      }).then(function(modal) {
		        modal.element.modal({
		          backdrop: 'static'
		        });
	      });
	
	}	


}])