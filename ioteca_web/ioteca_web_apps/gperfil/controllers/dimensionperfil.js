app

    .controller("DimensionperfilCtrl", function($scope, $rootScope, API, $state, $window, $stateParams, $mdDialog, toastr) {

    //Valores iniciales
    //var perfil_id = $stateParams.perfil_id; 
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];

    $scope.list = function(params) {
        console.log("page_size: " + params.page_size);
        //API.Autor.list({ query: $scope.query, page: page }).$promise.then(function(r) {
        API.DimensionPerfil.list(params).$promise.then(function(r) {
            $scope.lista = r;
            // $scope.lista = r.results;
            $scope.options = r.options;
            //$scope.per= $scope.per ? $scope.per :r.options.page_size;
        }, function(err) {
            console.log("Error al listar " + err);
        });
    };

    $scope.list(params);

    $scope.buscar = function() {
        params.page = 1;
        // params.fields = 'nombre,direccion';
        params.fields = 'perfil';
        params.query = $scope.query;
        params.page_size= $scope.per;
        $scope.list(params);

    };


    $scope.listAll = function() {
        params.all = true; //así debe quedar
        $scope.list(params);

    };

    
    $scope.eliminarDPerfil = function(d) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Desea Eliminar DimensionPerfil?')
          .textContent('Esta DimensionPerfil se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
    $mdDialog.show(confirm).then(function() {
            API.DimensionPerfil.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.info('Se elimino correctamente');
                $scope.list(params);
            }, function(err) {
                console.log("Err " + err);
            });
      console.log("elimino");
    }, function() {
      console.log("no elimino");
    });
  };
});
