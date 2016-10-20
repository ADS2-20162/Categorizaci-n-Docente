app

    .controller("DimensionCtrl", function($scope, API, $window, $stateParams, $mdDialog, toastr) {

    //Valores iniciales
    var url = 'ioteca_web_apps/gperfil/views/dimension';
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];
    $scope.dimension = {};

    function list(params) {

        console.log("page_size: " + params.page_size);
        console.log("Funcion lista");
        API.Dimension.list(params).$promise.then(function(r) {
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
        list(params);
    };

    $scope.new = function(evt) {
        $scope.dimension.id = null;
        $scope.dimension = {};
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
        $scope.dimension = d;
        $mdDialog.show({
            scope: $scope,
            templateUrl: url +'/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            list(params);
            $scope.dimension = {};
        }, function() {});
    };

    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un nombre del Area repetidas veces..
    function buscarD(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['nombre']) {
                    return v[i]['nombre'];
                }  
            }
    }

    $scope.saveDim = function(nombre) {
        if ($scope.dimension.id) {
            API.Dimension.update({ id: $scope.dimension.id }, $scope.dimension).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se Actualizo correctamente');
                $mdDialog.hide();
            }, function(err) {
                console.log("Error al actualizar " + err);
            });

        } else {
            $scope.dimension = {};
            $scope.dimension = {'nombre': nombre};
            if (buscarD(nombre, $scope.lista) == nombre) {
               toastr.error('La Dimension ya existe', 'Error'); 
            } else {
                API.Dimension.save($scope.dimension).$promise.then(function(r) {
                    console.log("r: " + r);
                    toastr.success('Se agrego correctamente');
                    $mdDialog.hide();
                }, function(err) {
                    console.log("Error al guardar " + err);
                });                
            }
        }
    };

    $scope.delete = function(d) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Desea Eliminar Dimension?')
          .textContent('Esta Dimension se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
    $mdDialog.show(confirm).then(function() {
            API.Dimension.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.info('Se elimino correctamente');
                list(params);
            }, function(err) {
                console.log("Err " + err);
            });
      console.log("elimino");
    }, function() {
      console.log("no elimino");
    });
  };

});
