app
	.controller('SeccionCtrl', function($scope, APII, $state, $stateParams, $window, $mdDialog, toastr){
		var params = {};
		var url = 'ioteca_web_apps/cleg/views/seccion';
		params.page = $stateParams.page ? $stateParams.page : 1;
		params.page_size = 5;
		$scope.lista = [];
		$scope.seccion = {};

		function list(params){
			APII.Seccion.list(params).$promise.then(function(r){
				$scope.lista = r;
			}, function(err){
				console.log("Err" +err);
			});
		}
		list(params);

		$scope.listItem = function() {  				//listar Item para Select al agregar un nuevo SubItem
	        APII.Item.list().$promise.then(function(r) {//
	            $scope.listaI = r.results;
	        }, function(err) {
	           console.log("Err " + err);
	        });
	    };
	    $scope.listItem();

		$scope.listSubItem = function(i) {  
	        APII.SubItem.list({item: i}).$promise.then(function(r) {
	            $scope.listaS = r;
	        }, function(err) {
	           console.log("Err " + err);
	        });
	    };
	    $scope.listSubItem();

	    $scope.cancel = function(){
			$mdDialog.cancel();
			list(params);
		};

		$scope.new = function(evt) {				//mdDialog para Añadir un nuevo ITEM
	        $scope.seccion.id = null;
	        $scope.seccion = {};
	        $mdDialog.show({
	            scope: $scope,
	            targetEvent: evt,
	            templateUrl: url +'/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	        }, function() {});
	    };

	    //end mdDialog
	    $scope.sel = function(d) {
	        $scope.seccion = d;
	        $mdDialog.show({
	            scope: $scope,
	            templateUrl: url +'/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	            $scope.seccion = {};
	        }, function() {});
	    };

	    $scope.saveSection = function(subitem, nombre, descripcion, estado) {		//funcion para guardar Seccion
	    	if ($scope.seccion.id) {
	            APII.Seccion.update({ id: $scope.seccion.id }, $scope.seccion).$promise.then(function(r) {
	                console.log("r: " + r);
	                toastr.success('Se Actualizo correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	                console.log("Err " + err);
	            });

	        } else {
	            $scope.seccion = {};
	            $scope.seccion = {'subitem': subitem, 'nombre': nombre, 'descripcion': descripcion, 'estado': estado};
	                APII.Seccion.save($scope.seccion).$promise.then(function(r) {
	                console.log("r: " + r);
	                list(params);	                
	                toastr.success('Se agrego correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	                console.log("Err " + err);
	            });
	        } 
	    };

	    $scope.delete = function(d) {
			var confirm = $mdDialog.confirm()
			.title('Desea Eliminar SubItems')
			.textContent('Este Seccion se eliminara y ya no podra encontrar en su lista')
			.ariaLabel('Lucky day')
			.ok('SI')
			.cancel('NO');
		$mdDialog.show(confirm).then(function(){
			APII.Seccion.delete({id: d.id}).$promise.then(function(r){
				toastr.info('Se elimino Correctamente', 'Info');
				list(params);
			}, function(err){
				console.log("Err" +err);
			});
			console.log("elimino");
		}, function(){
			console.log("no elimino");
		});
		};

		$scope.changeEstado = function(d){
	    	APII.Seccion.update({ id: d.id }, d).$promise.then(function(r){
	    			toastr.info(d.estado?"Habilitado Correctamente":"Deshabilitado Correctamente");
				}, function(err){
	    			toastr.warm("Error no se pudo realizar la operacion");
		    });
		};

	});
