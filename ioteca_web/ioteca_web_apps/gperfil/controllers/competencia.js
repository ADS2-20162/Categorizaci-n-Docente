app

    .controller("CompetenciaCtrl", function($scope, API, $window, $stateParams, $mdDialog, toastr) {

    //Valores iniciales
    var url = 'ioteca_web_apps/gperfil/views/competencia';
    var params = {};
    list(params);
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];
    $scope.competencia = {};

    function list(params) {
        console.log("page_size: " + params.page_size);
        API.Competencia.list(params).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
        }, function(err) {
            console.log("Err " + err);
        });
    }


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
        $scope.competencia.id = null;
        $scope.competencia = {};
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
        $scope.competencia = d;
        $mdDialog.show({
            scope: $scope,
            templateUrl: url +'/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            list(params);
            $scope.competencia = {};
        }, function() {});
    };


    $scope.save = function() {
        if ($scope.competencia.id) {

            API.Competencia.update({ id: $scope.competencia.id }, $scope.competencia).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se Actualizo correctamente');
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });

        } else {
            API.Competencia.save($scope.competencia).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se agrego correctamente');
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };

    $scope.delete = function(d) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Desea Eliminar Competencia?')
          .textContent('Esta Competencia se eliminará....!')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
    $mdDialog.show(confirm).then(function() {
            API.Competencia.delete({ id: d.id }).$promise.then(function(r) {
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
