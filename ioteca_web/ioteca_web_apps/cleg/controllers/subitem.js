app
	.controller('SubItemCtrl', function($scope, APII, $state, $stateParams, $window, $mdDialog, toastr){
		var params = {};
		var url = 'ioteca_web_apps/cleg/views/subitem';
		params.page = $stateParams.page ? $stateParams.page : 1;
		params.page_size = 5;
		$scope.lista = [];
		$scope.subitem = {};

		function list(params){
			APII.SubItem.list(params).$promise.then(function(r){
				$scope.lista = r;
			}, function(err){
				console.log("Err" +err);
			});
		}
		list(params);

		//listar Item para Selct
		$scope.listItem = function() {  
	        APII.Item.list().$promise.then(function(r) {
	            $scope.listaI = r.results;
	        }, function(err) {
	           console.log("Err " + err);
	        });
	    };
	    $scope.listItem();


		$scope.listAll = function() {
	        params.all = true; //así debe quedar
	        list(params);
	    };

	    $scope.cancel = function(){
			$mdDialog.cancel();
			list(params);
		};

		//mdDialog para Añadir un nuevo SubItem
		$scope.new = function(evt) {
	        $scope.subitem.id = null;
	        $scope.subitem = {};
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
	        $scope.subitem = d;
	        $mdDialog.show({
	            scope: $scope,
	            templateUrl: url +'/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	            $scope.subitem = {};
	        }, function() {});
	    };

	    //function (elemento, venctor)
	    //funcion para buscar un elemento en la lista
	    //para no guardar un nombre del subitem repetidas veces..
	    function buscarI(a, v){
	            for (var i = 0; i < v.length; i++) {
	                if (a == v[i]['nombre']) {
	                    return v[i]['nombre'];
	                }  
	            }
	    }

	    $scope.save = function(item, nombre, descripcion, estado) {
	        if ($scope.subitem.id) {
	            APII.SubItem.update({ id: $scope.subitem.id }, $scope.subitem).$promise.then(function(r) {
	                console.log("r: " + r);
	                toastr.success('Se Actualizo correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	                console.log("Err " + err);
	            });

	        } else {
	            $scope.subitem = {};
	            $scope.subitem = {'item': item, 'nombre': nombre, 'descripcion': descripcion, 'estado': estado};
	            if (buscarI(nombre, $scope.lista) == nombre) {
	                toastr.error('El subitem ya existe', 'Error');
	            } else {
	            APII.SubItem.save($scope.subitem).$promise.then(function(r) {
	                console.log("r: " + r);
	                toastr.success('Se agrego correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	                console.log("Err " + err);
	            });                
	            }
	        }
	    };

	    $scope.delete = function(d) {
			var confirm = $mdDialog.confirm()
			.title('Desea Eliminar SubItems')
			.textContent('Este SubItems se eliminara y ya no podra encontrar en su lista')
			.ariaLabel('Lucky day')
			.ok('SI')
			.cancel('NO');
		$mdDialog.show(confirm).then(function(){
			APII.SubItem.delete({id: d.id}).$promise.then(function(r){
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
	    	APII.SubItem.update({ id: d.id }, d).$promise.then(function(r){
	    			toastr.info(d.estado?"Habilitado Correctamente":"Deshabilitado Correctamente");
				}, function(err){
	    			toastr.warm("Error no se pudo realizar la operacion");
		    });
		};
	});