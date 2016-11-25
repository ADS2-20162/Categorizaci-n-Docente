app

    .controller("EscalaCtrl", function($scope, API, $window, $stateParams, $mdDialog, toastr) {

    //Valores iniciales
    var url = 'ioteca_web_apps/gperfil/views/escala';
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];
    $scope.escala = {};

    function list (params) {

        console.log("page_size: " + params.page_size);
        API.Escala.list(params).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
        }, function(err) {
            console.log("Error al listar " + err);
        });
    }
    list(params);

    $scope.buscar = function() {
        params.page = 1;
        // params.fields = 'nombre,direccion';
        params.fields = 'nombre';
        params.query = $scope.query;
        params.page_size= $scope.per;
        list(params);

    };


    $scope.listAll = function() {
        //params.page = 1;
        //params.fields = 'nombre,direccion';
        //params.query = $scope.query;
        //params.page_size= $scope.per;
        params.all = true; //así debe quedar
        list(params);

    };

    //mdDialog
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    $scope.new = function(evt) {
        $scope.escala.id = null;
        $scope.escala = {};
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
        $scope.escala = API.Escala.get({ id: d.id });
        $mdDialog.show({
            scope: $scope,
            templateUrl: url +'/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            list(params);
            $scope.escala = {};
        }, function() {});
    };

    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un nombre del Escala repetidas veces..
    function buscarE(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['nombre']) {
                    return v[i]['nombre'];
                }  
            }
    }

    $scope.save = function(nombre) {
        if ($scope.escala.id) {
            API.Escala.update({ id: $scope.escala.id }, $scope.escala).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se Actualizo correctamente');
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });

        } else {
            $scope.escala = {};
            $scope.escala = {'nombre': nombre};
            if (buscarE(nombre, $scope.lista) == nombre) {
                toastr.error('La Escala '+nombre+' ya existe');
            } else {
            API.Escala.save($scope.escala).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se agrego correctamente');
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
                
            }
        }
    };

    $scope.delete = function(d) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Desea Eliminar Escala?')
          .textContent('Esta Escala se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
    $mdDialog.show(confirm).then(function() {
            API.Escala.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.info('Se elimino correctamente');
                list(params);
            }, function(err) {
                console.log("Err " + err);
            });
    });
  };

});
