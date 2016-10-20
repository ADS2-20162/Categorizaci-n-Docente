app

    .controller("AreaCtrl", function($scope, API, $window, $stateParams, $mdDialog, toastr) {

    //Valores iniciales
    var url = 'ioteca_web_apps/gperfil/views/area';
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];
    $scope.area = {};

    function list(params) {
        API.Area.list(params).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
        }, function(err) {
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
        params.all = true; //así debe quedar
        list(params);
    };

    //mdDialog
    $scope.cancel = function() {
        $mdDialog.cancel();
        list(params);
    };

    $scope.new = function(evt) {
        $scope.area.id = null;
        $scope.area = {};
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
        console.log("legaremos sanos y salvos" +d);
        $scope.area = d;
        $mdDialog.show({
            scope: $scope,
            templateUrl: url +'/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            list(params);
            $scope.area = {};
        }, function() {});
    };

    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un nombre del Area repetidas veces..
    function buscarA(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['nombre']) {
                    return v[i]['nombre'];
                }  
            }
    }

    $scope.save = function(nombre) {
        if ($scope.area.id) {
            API.Area.update({ id: $scope.area.id }, $scope.area).$promise.then(function(r) {
                toastr.success('El Area se Actualizo correctamente');
                $mdDialog.hide();
            }, function(err) {
            });

        } else {
            $scope.area = {};
            $scope.area = {'nombre': nombre};
            if (buscarA(nombre, $scope.lista) == nombre) {
                toastr.error('El Area '+nombre+' ya existe', 'Error');
            } else {
            API.Area.save($scope.area).$promise.then(function(r) {
                toastr.success('El Area se agrego correctamente');
                $mdDialog.hide();
            }, function(err) {
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
            API.Area.delete({ id: d.id }).$promise.then(function(r) {
                toastr.info('El Area se elimino correctamente');
                list(params);
            }, function(err) {
            });
    }, function() {
    });
  };

});
