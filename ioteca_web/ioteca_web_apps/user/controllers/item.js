app
    .controller('ItemsCtrl', function($scope, ApiUser, $window, $stateParams, $mdDialog, toastr, $timeout, $interval){
	var params = {};
	var url = 'ioteca_web_apps/user/views';
	$scope.lista = [];
        $scope.listaEC = [];
        $scope.listaECR = [];
        $scope.listaP = [];
        $scope.registro = {} ;
		// var self = this;
	 //    self.determinateValue = 30;
	function list(params){ 				//esta es la funcion para listar los items y al vez Subitems y seccion
          // $scope.isLoading = true;
	  ApiUser.Item.list(params).$promise.then(function(r){
            console.log(r.results);
            $scope.lista = r.results;
            $scope.options = r.options;
          }, function(err){
            console.log("Err" +err);
          });
        }
	list(params);
        
        $scope.listarElementCampReg = function(){
            ApiUser.ElementoCampoRegistro.list().$promise.then(function(r){
                $scope.listaECR = r.results;
            }, function(err){
                console.log("Err" + err);
            });
        }
        $scope.listarElementCampReg(); 

        // var param_elem = {elemento_campo: $scope.listaECR.elemento_campo.elemento.sub_item};
        // $scope.listelemen_campo = function(){
        //     ApiUser.ElementoCampoRegistro.list().$promise.then(function(r){
        //         $scope.listaECR = r.results;
        //     }, function(err){
        //         console.log("Err" + err);
        //     });
        // }
        // $scope.listelemen_campo();  

        $scope.listPerson = function(){
          ApiUser.Persona.list(params).$promise.then(function(r){
            $scope.listaP = r.results;
          }, function(err){
            console.log("Err" +err);
          });    
        };
        $scope.listPerson(); 

        $scope.listElemCam = function() {  
          ApiUser.ElementoCampo.list().$promise.then(function(r) {
            $scope.listaEC = r.results;
            console.log(r.results);
          }, function(err) {
            console.log("Err " + err);
          });
        };
        $scope.listElemCam();

      	$scope.listAll = function() {
          params.all = true; //así debe quedar
          $scope.listarElementCampReg(); 
        };
        
        $scope.cancel = function() {
          $mdDialog.cancel();
          $scope.listarElementCampReg();
        };
		//progress linear
        var vm = this;
        vm.loading = true;
        vm.toggleLoading = function() {
          vm.loading = !vm.loading;
        };
        
        $scope.subitemnew = function(evt,subitem) {
          $scope.registro.id = null;
          $scope.registro = {};
          $scope.subitem = subitem.nombre;
          // $scope.registro.elemento_campo = i.elemento_campo.id;
          $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: url +'/legajo/subitem.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
          }).then(function() {
            $scope.listarElementCampReg(); 
          }, function() {});
        }; 
        
        $scope.reg = function(i,subitem) {
          $scope.registro = i;
          $scope.registro.elemento_campo = i.elemento_campo.id;
          dic = {
              "id": $scope.registro.id,
              "set_elemento_campo": $scope.registro.elemento_campo,
              "persona": $scope.registro.persona,
              "data": $scope.registro.data 
          };
          // toastr.success(dic);
          $scope.subitem = subitem.nombre;
          $mdDialog.show({
            scope: $scope,
            templateUrl: url +'/legajo/subitem.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
          }).then(function() {
            $scope.listarElementCampReg(); 
            // $scope.registro = {};
            }, function() {});
        };
        
        function buscarI(a, v){						//function (elemento, venctor)
            for (var i = 0; i < v.length; i++) {	//funcion para buscar un elemento en la lista
                if (a == v[i]['data']) {			//para no guardar un nombre del item repetidas veces..
                    return v[i]['data'];
                }  
            }
	    } 

        $scope.saveRegistro = function(elemento_campo,persona,data) {
            if ($scope.registro.id) {
              ApiUser.ElementoCampoRegistro.update({id: $scope.registro.id}, dic).$promise.then(function(r){
                console.log('r: ' + r);
                toastr.success('Se Actualizo Correctamente');
                $mdDialog.hide();
              },function(err){
                console.log("Err " + err);
              });

            } else {	            
                // toastr.success($scope.registro);
                $scope.registro = {"set_elemento_campo":elemento_campo,"persona":persona,"data":data};
                if (buscarI(data, $scope.listaECR) == data){
                    toastr.error('Ese dato ya existe');
                } else {
	                ApiUser.ElementoCampoRegistro.save($scope.registro).$promise.then(function(r) {
		                console.log("r: " + r);
		                toastr.success('Se agrego correctamente');
                        // toastr.success($scope.registro);
		                $mdDialog.hide();
		            }, function(err) {
		                console.log("Err " + err);
		            });  
                }
            }
	    };  

        $scope.delReg = function(i) {
          var confirm = $mdDialog.confirm()
            .title('Desea Eliminar este registro')
            .textContent('Este registro se eliminara y ya no podra encontrar en su SUBITEM')
            .ariaLabel('Lucky day')
            .ok('SI')
            .cancel('NO');
          $mdDialog.show(confirm).then(function(){
            ApiUser.ElementoCampoRegistro.delete({id: i.id}).$promise.then(function(r){
              toastr.info('Se elimino Correctamente', 'Info');
              $scope.listarElementCampReg(); 
            }, function(err){
              console.log("Err" +err);
            });
            console.log("elimino");
          }, function(){
            console.log("no elimino");
          });
        };
	   
    });
