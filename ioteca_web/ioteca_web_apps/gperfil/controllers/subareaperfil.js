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
    $scope.aperfil = API.AreaPerfil.get({id:sap_id});

    //lista Subareas
    function listSubareas() {
        API.Subarea.list(params).$promise.then(function(r) {
            $scope.listaSA = r.results;
            $scope.options = r.options;
            compare();
        }, function(err) {
            console.log("Err " + err);
        });
    }
    listSubareas();

    //para agreagr nuevas subareas
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

    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un nombre del SubArea repetidas veces..
    function buscarSA(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['nombre']) {
                    return v[i]['nombre'];
                }  
            }
    }


    //para guardar los Suabreas
    $scope.save = function(nombre) {
            $scope.subarea = {};
            $scope.subarea = {'nombre': nombre};
            if (buscarSA(nombre, $scope.listaSA) == nombre) {
                toastr.error('El SubArea ya existe');
            } else {
            API.Subarea.save($scope.subarea).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se agrego correctamente');
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });                
            }
    };

    //funcion para regresar al anterior Windows
    $scope.goBack = function() {
    window.history.back();
    };

    //listar las Subareas que fueron añadidas aun 
    //perfil
    function listaSPerfil() {
        API.SubareaPerfil.list().$promise.then(function(r) {
            $scope.lista_sp = r;
        });
    }
    listaSPerfil(); 

    //listar las Subareas que fueron añadidas aun 
    //perfil
    function listaSubareaPerfil() {
        API.SubareaPerfil.list({areaperfil:sap_id}).$promise.then(function(r) {
            console.log(r);
            $scope.lista_sap = r;
            listSubareas();
        }, function(err) {
           console.log("Error en lista_sap " + err);
        });
    }
    listaSubareaPerfil();         

    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar Subarea repetidas veces..
    function compararS(a, v){
        // function (elemento, venctor)
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['subarea']) {
                    return v[i]['subarea'];
                }  
            }
    }

    //Agregar una sub area  aun perfil comparando con la funcion compararS()
    //para no guardar repetidas veces las subareas.
    $scope.guardarsap = function (areaperfil,subarea){
        $scope.subareaperfil = {};
        $scope.subareaperfil = { 'areaperfil': areaperfil, "subarea":subarea};
        if (compararS(subarea, $scope.lista_sap) == subarea) {
            console.log("SubareaPerfil "+subarea+" ya existe");
            toastr.error('SubareaPerfil ya existe', 'Error');
        } else {
            API.SubareaPerfil.save($scope.subareaperfil).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se agrego correctamente');
                listSubareas();
                listaSubareaPerfil();
            }, function(err) {
                console.log("Err " + err  );
            });            
        }
     }; 

    //para quitar de la lista las subareas agregadas a un perfil
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

    //funcion filter start
    function compare(){
        for (var j = 0; j < $scope.lista_sap.length ; j++) {
            for (var i = 0; i < $scope.listaSA.length ; i++) {
                if($scope.listaSA[i].nombre===$scope.lista_sap[j].subarea){
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
