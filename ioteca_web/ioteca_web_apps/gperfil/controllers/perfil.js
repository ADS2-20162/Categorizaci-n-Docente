app

    .controller("PerfilCtrl", function($scope, API, $window, $stateParams, $mdDialog, toastr) {

    //Valores iniciales
    var url = 'ioteca_web_apps/gperfil/views/perfil';
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.perfil = {};

    $scope.list = function(params) {
        API.Perfil.list(params).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
        }, function(err) {
           console.log("Err " + err);
        });
    };

    $scope.list(params);

    $scope.buscar = function() {
        params.page = 1;
        // params.fields = 'nombre,direccion';
        params.fields = 'nombre';
        params.query = $scope.query;
        params.page_size= $scope.per;
        $scope.list(params);

    };


    $scope.listAll = function() {
        params.all = true; //así debe quedar
        $scope.list(params);

    };

    //mdDialog
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    
    $scope.new = function(evt) {
        $scope.perfil.id = null;
        $scope.perfil = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: url +'/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list(params);

        }, function() {});
    };


    //end mdDialog

    $scope.sel = function(d) {
        $scope.perfil = API.Perfil.get({ id: d.id });
        $mdDialog.show({
            scope: $scope,
            templateUrl: url+'/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list(params);
            $scope.perfil = {};
        }, function() {});
    };


    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un nombre del Area repetidas veces..
    function buscarP(a, v){
        for (var i = 0; i < v.length; i++) {
            if (a == v[i]['nombre']) {
                return v[i]['nombre'];
            }  
        }
    }

    $scope.save = function(nombre) {
        if ($scope.perfil.id) {

            API.Perfil.update({ id: $scope.perfil.id }, $scope.perfil).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se Actualizo correctamente');
                //$scope.list();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });

        } else {
            $scope.area = {};
            $scope.area = {'nombre': nombre};
            if (buscarP(nombre, $scope.lista) == nombre) {
                toastr.error('El Area '+nombre+' ya existe', 'Error');
            } else {
            API.Perfil.save($scope.perfil).$promise.then(function(r) {
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
        var confirm = $mdDialog.confirm()
              .title('Desea Eliminar Area?')
              .textContent('Esta Area se eliminará y ya no podrás encontrarla')
              .ariaLabel('Lucky day')
              .targetEvent()
              .ok('SI')
              .cancel('NO');
        $mdDialog.show(confirm).then(function() {
            API.Perfil.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.info('El Perfil se elimino correctamente');
                $scope.list(params);
            }, function(err) {
            });
        }, function() {
        });
    };

});

