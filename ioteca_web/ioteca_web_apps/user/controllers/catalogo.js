app
	.controller('CatalogoCtrl', function($scope, ApiUser, $window, $stateParams, $mdDialog, toastr, $timeout){
		// var params = {};
		// var url = 'ioteca_web_apps/user/views';
		$scope.lista = [];

		(function (){
	        ApiUser.Perfil.list().$promise.then(function(r){
					$scope.lista = r;
	            }, function(err) {
	                console.log("Error al listar persona " + err);
	        });
	        
	        ApiUser.EscalaDimension.list().$promise.then(function(r){
					$scope.listaD = r;
	            }, function(err) {
	                console.log("Error al listar EscalaDim " + err);
	        });
	    //     ApiUser.CompetenciaPerfil.list().$promise.then(function(r){
					// $scope.listaC = r;
	    //         }, function(err) {
	    //             console.log("Error al listar Competencias" + err);
	    //     });
	        ApiUser.SubareaPerfil.list().$promise.then(function(r){
					$scope.listaS = r;
	            }, function(err) {
	                console.log("Error al listar Subarea " + err);
	        });
	    })();

	    //===================================================
	    //Listar Areas por Perfil
	    //===================================================
	    $scope.loadAreas = function(d) {
	    	$scope.perfil=d;
			listaArea = function(){
			    ApiUser.AreaPerfil.list({'perfil':$scope.perfil}).$promise.then(function(r){
						$scope.listaA = r;
			    });
			};
			listaArea();
		};

		//===================================================
		//Listar Sub areas
		//===================================================
		$scope.loadSubarea = function(e){
			$scope.aperfil = e;
			console.log("=======>>>"+$scope.aperfil);
			listaSubarea = function(){
			    ApiUser.CompetenciaPerfil.list({'competencia':$scope.aperfil}).$promise.then(function(r){
						$scope.listaC = r;
			    });
			    ApiUser.Dimension.list({'dimension':$scope.aperfil}).$promise.then(function(r){
						$scope.listaDim = r;
			    });
			};
			listaSubarea();
		};

		//====================================================
		//change estado
		//====================================================
		$scope.changeEstado = function(escala, competencia){
	    	console.log("===========>>"+escala);
	    	console.log("===========>>"+competencia);
	   		$scope.registro = {};
            $scope.registro = {'escala': escala, 'competencia': competencia};
                ApiUser.Registro.save($scope.registro).$promise.then(function(r) {
                console.log("r: " + r);	                
                toastr.success('Se agrego correctamente');
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
		};


	});