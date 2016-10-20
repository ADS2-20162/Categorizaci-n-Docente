app

	.controller("ItemCtrl", function($scope, APII, $window, $stateParams, $mdDialog, toastr, $timeout){
		var params = {};
		var url = 'ioteca_web_apps/cleg/views';
		var item_id = $stateParams.	item_id; 
		params.page_size = 5;
		$scope.lista = [];
		$scope.subitem = {};
		$scope.item = {};
		$scope.seccion = {};

		function list(params){ 				//esta es la funcion para listar los items y al vez Subitems y seccion
			console.log("page_size: " + params.page_size);
			APII.Item.list(params).$promise.then(function(r){
				$scope.lista = r.results;
				$scope.options = r.options;
			}, function(err){
				console.log("Err" +err);
			});
		}
		list(params);

		$scope.listItem = function() {  				//listar Item para Select al agregar un nuevo SubItem
	        APII.Item.list().$promise.then(function(r) {
	            $scope.listaI = r.results;
	        }, function(err) {
	           console.log("Err " + err);
	        });
	    };
	    $scope.listItem();

	    $scope.listSubItem = function(i) {  				//listar SubItem para Select al agregar un nuevo Seccion
	        APII.SubItem.list({item: i}).$promise.then(function(r) {
	            $scope.listaS = r;
	        }, function(err) {
	           console.log("Err " + err);
	        });
	    };
	    

		$scope.listAll = function() { 
	        params.all = true; //así debe quedar
	        list(params);
	    };

		$scope.cancel = function(){
			$mdDialog.cancel();
			list(params);
		};

		$scope.new = function(evt) {				//mdDialog para Añadir un nuevo ITEM
	        $scope.item.id = null;
	        $scope.item = {};
	        $mdDialog.show({
	            scope: $scope,
	            targetEvent: evt,
	            templateUrl: url +'/item/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	        }, function() {});
	    };

	    $scope.sel = function(d) {    							//end mdDialog para seleccioner le item que sera actualizada
	        $scope.item = d;	//mediante el formulario
	        $mdDialog.show({
	            scope: $scope,
	            templateUrl: url +'/item/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	            $scope.subitem = {};
	        }, function() {});
	    };

	    $scope.showInput = function(d,html_id){
	    	d.isEditable = true;
	    	$timeout(function() {
		        var element = $window.document.getElementById(html_id);
		        if(element)
		          element.focus();
		      });
	    };

	    $scope.editItem = function(e,d){		//funcion para eventos del teclado
	    	switch(e.keyCode){
	    		case 27: 						//teclado escape sin guardar
	    			d.isEditable = false;
	    			list(params);
	    			break;
	    		case 13: 						//teclado INTRO para guardar la actualizacion del Item mediante el Input
    				APII.Item.update({ id: d.id }, d).$promise.then(function(r) {
	                console.log("r: " + r);
	                toastr.success('Se Actualizo correctamente');
	                $scope.listItem();
		            }, function(err) {
		                console.log("Err " + err);
		            });
		    		d.isEditable = false;
			    	break;
	    	}
	    };

	    $scope.editSubitem = function(e,d){		//funcion para eventos del teclado
	    	switch(e.keyCode){
	    		case 27: 						//teclado escape sin guradar
	    			d.isEditable = false;
	    			list(params);
	    			break;
	    		case 13: 						//teclado INTRO para guardar la actualizacion del SubItem
    				APII.SubItem.update({ id: d.id }, d).$promise.then(function(r) {
	                console.log("r: " + r);
	                toastr.success('Se Actualizo correctamente');
	                $scope.listItem();
		            }, function(err) {
		                console.log("Err " + err);
		            });
		    		d.isEditable = false;
			    	break;
	    	}
	    };

	    $scope.editSeccion = function(e,d){		//funcion para eventos del teclado
	    	switch(e.keyCode){
	    		case 27: 						//teclado escape sin guardar
	    			d.isEditable = false;
	    			list(params);
	    			break;
	    		case 13: 						//teclado INTRO para guardar la actualizacion del Seccion
    				APII.Seccion.update({ id: d.id }, d).$promise.then(function(r) {
	                console.log("r: " + r);
	                toastr.success('Se Actualizo correctamente');
		            }, function(err) {
		                console.log("Err " + err);
		            });
		    		d.isEditable = false;
			    	break;
	    	}
	    };

	    $scope.ocultarInput = function(d){ 			//funcion para ocultar al hacer click fura del input
	    	d.isEditable = false;
	    	list(params);
	    };

	    $scope.addSubItem = function(evt) {			//end mdDialog addSection
	        $scope.subitem.id = null;				//para añadir el Sub item
	        $scope.subitem = {};
	        $mdDialog.show({
	            scope: $scope,
	            targetEvent: evt,
	            templateUrl: url +'/subitem/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	        }, function() {});
	    };

	     $scope.addSection = function(evt) {			//end mdDialog addSection
	        $scope.seccion.id = null;				//para añadir el Sub item
	        $scope.seccion = {};
	        $mdDialog.show({
	            scope: $scope,
	            targetEvent: evt,
	            templateUrl: url +'/seccion/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	        }, function() {});
	    };


	    function buscarI(a, v){						//function (elemento, venctor)
            for (var i = 0; i < v.length; i++) {	//funcion para buscar un elemento en la lista
                if (a == v[i]['nombre']) {			//para no guardar un nombre del item repetidas veces..
                    return v[i]['nombre'];
                }  
            }
	    }

	    $scope.saveItem = function(nombre, descripcion, estado) {
	    	if ($scope.item.id) {
	            APII.Item.update({ id: $scope.item.id }, $scope.item).$promise.then(function(r) {
	                console.log("r: " + r);
	                toastr.success('Se Actualizo correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	                console.log("Err " + err);
	            });

	        } else {
	            $scope.item = {};
	            $scope.item = {'nombre': nombre, 'descripcion': descripcion, 'estado': estado};
	            if (buscarI(nombre, $scope.lista) == nombre) {
	                toastr.error('El Item ya existe');
	            } else {
	            APII.Item.save($scope.item).$promise.then(function(r) {
	                console.log("r: " + r);
	                toastr.success('El item se agrego correctamente');
	                $scope.listItem();
	                $mdDialog.hide();
	            }, function(err) {
	                console.log("Err " + err);
	            });                
	            }
	        }
	    };

	    $scope.save = function(item, nombre, descripcion, estado) {
	            $scope.subitem = {};
	            $scope.subitem = {'item': item, 'nombre': nombre, 'descripcion': descripcion, 'estado': estado};
	            APII.SubItem.save($scope.subitem).$promise.then(function(r) {
	                console.log("r: " + r);
	                list(params);
	                toastr.success('Se agrego correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	                console.log("Err " + err);
	            }); 
	    };

	    $scope.saveSection = function(subitem, nombre, descripcion, estado) {		//funcion para guardar Seccion
	            console.log("==========>>>"+subitem);
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
	    };

		$scope.delItem = function(d) {			//funcion para eliminar Item
			var confirm = $mdDialog.confirm()
			.title('Desea Eliminar Items')
			.textContent('Este Items se eliminara y ya no podra encontrar en su lista')
			.ariaLabel('Lucky day')
			.ok('SI')
			.cancel('NO');
		$mdDialog.show(confirm).then(function(){
			APII.Item.delete({id: d.id}).$promise.then(function(r){
				toastr.info('Se elimino Correctamente');
				list(params);
				$scope.listItem();
			}, function(err){
				console.log("Err" +err);
			});
			console.log("elimino");
		}, function(){
			console.log("no elimino");
		});
		};


		$scope.delSubItem = function(subitem) {		//funcion para eliminar los Sub Items
	        	var confirm = $mdDialog.confirm()
				.title('Desea Eliminar SubItems')
				.textContent('Este SubItems se eliminara y ya no podra encontrar en su lista')
				.ariaLabel('Lucky day')
				.ok('SI')
				.cancel('NO');
			$mdDialog.show(confirm).then(function(){
				APII.SubItem.delete({id: subitem.id}).$promise.then(function(r){
					toastr.info('Se elimino Correctamente');
					list(params);
				}, function(err){
					console.log("Err" +err);
				});
				console.log("elimino");
			}, function(){
				console.log("no elimino");
			});
	    };

		$scope.delSection = function(d) {			//funcion para eliminar los Seccion
	        	var confirm = $mdDialog.confirm()
				.title('Desea Eliminar Seccion')
				.textContent('Este Seccion se eliminara y ya no podra encontrar en su lista')
				.ariaLabel('Lucky day')
				.ok('SI')
				.cancel('NO');
			$mdDialog.show(confirm).then(function(){
				APII.Seccion.delete({id: d.id}).$promise.then(function(r){
					toastr.info('Se elimino Correctamente');
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
	    	console.log("===========>>"+d. nombre);
	    	APII.Item.update({ id: d.id }, d).$promise.then(function(r){
	    			toastr.info(d.estado?"Habilitado Correctamente":"Deshabilitado Correctamente");
				}, function(err){
	    			toastr.warm("Error no se pudo realizar la operacion");
		    });
		};

		$scope.changeEstadoI = function(d){
	    	APII.SubItem.update({ id: d.id }, d).$promise.then(function(r){
	    			toastr.info(d.estado?"Habilitado Correctamente":"Deshabilitado Correctamente");
				}, function(err){
	    			toastr.warm("Error no se pudo realizar la operacion");
		    });
		    
		};

	});
