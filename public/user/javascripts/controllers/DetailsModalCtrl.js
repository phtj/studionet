angular.module('studionet')

.controller('DetailsModalCtrl', ['$scope', 'profile',  function($scope, profile){
	$scope.name = null;
  $scope.age = null;
 console.log('I am here Sakshi');
  
  //  This close function doesn't need to use jQuery or bootstrap, because
  //  the button has the 'data-dismiss' attribute.
  $scope.close = function() {
 	  close({
      name: $scope.user,
      age: $scope.modules
    }, 500); // close, but give 500ms for bootstrap to animate
  };

  //  This cancel function must use the bootstrap, 'modal' function because
  //  the doesn't have the 'data-dismiss' attribute.
  $scope.cancel = function() {

    //  Manually hide the modal.
    //$element.modal('hide');
    
    //  Now call close, returning control to the caller.
    close({
      name: $scope.user,
      age: $scope.modules
    }, 500); // close, but give 500ms for bootstrap to animate
  };



}]);