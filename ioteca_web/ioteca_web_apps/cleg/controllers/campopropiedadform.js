app
	.controller('CampoPropiedadFormCtrl', function($scope, APII, $state, $stateParams, $window, $mdDialog, toastr){
		var params = {};
		params.page = $stateParams.page ? $stateParams.page : 1;
		params.page_size = 5;
		$scope.lista = [];
		$scope.campopropiedadform = {};

		$scope.list = function(params){
			APII.CampoPropiedadForm.list(params).$promise.then(function(r){
				$scope.lista = r;
			}, function(err){
				console.log("Err" +err);
			});
		};
		$scope.list(params);

	});
