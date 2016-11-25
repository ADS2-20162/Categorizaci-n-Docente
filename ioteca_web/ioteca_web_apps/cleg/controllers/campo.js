app
	.controller('CampoCtrl', function($scope, APII, $state, $stateParams, $window, $mdDialog, toastr){
		var params = {};
		params.page = $stateParams.page ? $stateParams.page : 1;
		params.page_size = 5;
		$scope.lista = [];
        
        
        $scope.campo =[
          {
        "id": 1,
        "nombre": "Texto",
        "descripcion": "texto",
        "estado": true,
        "tipo_campo": "TextField"
    },
    {
        "id": 2,
        "nombre": "number",
        "descripcion": "number",
        "estado": true,
        "tipo_campo": "NumberField"
    },
        ];
        
        $scope.deleteItem = function (index) {
            $scope.campo.splice(index, 1);
        }; 
        $scope.sortableOptions = {
            containment: '#sortable-container',
            allowDuplicates: true
        };
        $scope.sortableCloneOptions = {
            containment: '#sortable-container',
            clone: true
    };
        
        $scope.list = function(params){
			APII.Campo.list(params).$promise.then(function(r){
				$scope.lista = r;
			}, function(err){
				console.log("Err" +err);
			});
		};
		$scope.list(params);

    });
