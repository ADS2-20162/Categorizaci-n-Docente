app

    .controller("SubareaPerfilCtrl", function($scope,$rootScope, API, $window, $stateParams, $mdDialog, toastr) {

    //Valores iniciales
    var params = {};
    var url = 'ioteca_web_apps/gperfil/views/subarea';
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];
    $scope.lista_sap = [];
    $scope.lista_sp = [];
    $scope.listaSA = [];
    $scope.subarea = {};

    var perfil_id = $stateParams.perfil_id; 
    var sap_id = $stateParams.sap_id; 

    //================================================================
    //lista Para el filtrar Subareas por perfil
    //================================================================
    function llamar() {
     API.AreaPerfil.get({id:sap_id}).$promise.then(function (r) {
         $scope.aperfil = r;
        API.SubareaPerfil.list({perfil:$scope.aperfil.perfil_id}).$promise.then(function(r) {
            $scope.lista_sp = r;
            listSubareas();
        });
     });
    }
    llamar();

    //================================================================
    //lista Subareas
    //================================================================
    function listSubareas() {
        API.Subarea.list(params).$promise.then(function(r) {
            $scope.listaSA = r.results;
            compare();
        }, function(err) {
            console.log("Err " + err);
        });
    }
    listSubareas();

    //================================================================
    //para agreagr nuevas subareas
    //================================================================
    $scope.new = function(evt) {
        $scope.subarea.id = null;
        $scope.subarea = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: url +'/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            listSubareas();
        }, function() {});
    };

    //================================================================
    //para guardar los Suabreas
    //================================================================
    $scope.save = function(nombre) {
            $scope.subarea = {};
            $scope.subarea = {'nombre': nombre};
            API.Subarea.save($scope.subarea).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se agrego correctamente');
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            }); 
    };

    //================================================================
    //funcion para regresar al anterior Windows
    //================================================================
    $scope.goBack = function() {
    window.history.back();
    };

    //================================================================
    //listar las Subareas que fueron añadidas aun perfil
    //================================================================
    function listaSubareaPerfil() {
        API.SubareaPerfil.list({areaperfil:sap_id}).$promise.then(function(r) {
            $scope.lista_sap = r;
            listSubareas();
        });
    }
    listaSubareaPerfil(); 


    //================================================================
    //Agregar una sub area  aun perfil
    //================================================================
    $scope.guardarsap = function (areaperfil,subarea){
        $scope.subareaperfil = {};
        $scope.subareaperfil = { 'areaperfil': areaperfil, "subarea":subarea};
            API.SubareaPerfil.save($scope.subareaperfil).$promise.then(function(r) {
                toastr.success('Se agrego correctamente Sub Area');
                llamar();
                listSubareas();
                listaSubareaPerfil();
            }, function(err) {
                console.log("Err " + err  );
            }); 
     }; 

    //================================================================
    //para quitar de la lista las subareas agregadas a un perfil
    //================================================================
    $rootScope.delete = function(d) {
        var confirm = $mdDialog.confirm()
          .title('Desea Eliminar Area?')
          .textContent('Esta SubArea se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
        $mdDialog.show(confirm).then(function() {
            API.SubareaPerfil.delete({ id: d.id }).$promise.then(function(r) {
            console.log("r: " + r);
            toastr.info('Se elimino correctamente');
            listaSubareaPerfil();  
            listSubareas();       
            }, function(err) {
                console.log("Err " + err);
            });
        }, function() {
      console.log("no elimino");
    });
    };


    $scope.list = function(params) {
        console.log("page_size: " + params.page_size);
        API.SubareaPerfil.list(params).$promise.then(function(r) {
            $scope.lista = r;
            $scope.options = r.options;
        }, function(err) {
            console.log("Err " + err);
        });
    };
    $scope.list(params);

    //================================================================
    //funcion filter start
    //================================================================
    function compare(){
        for (var j = 0; j < $scope.lista_sp.length ; j++) {
            for (var i = 0; i < $scope.listaSA.length ; i++) {
                if($scope.listaSA[i].nombre===$scope.lista_sp[j].subarea){
                    $scope.listaSA.splice(i,1);
                }
            }                 
        }
    }
    compare();

    $scope.cancel = function() {
        $mdDialog.cancel();
    };

});
