app

    .controller("SubareaCtrl", function($scope, API, $window, $stateParams, $mdDialog, toastr) {

    //Valores iniciales
    var url = 'ioteca_web_apps/gperfil/views/subarea';
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];
    $scope.subarea = {};
    

    function list(params) {

        console.log("page_size: " + params.page_size);
        console.log("Funcion lista");
        API.Subarea.list(params).$promise.then(function(r) {
            $scope.lista = r.results;
            $scope.options = r.options;
        }, function(err) {
            console.log("Err " + err);
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
            list(params);
        }, function() {});
    };
    //end mdDialog
    $scope.sel = function(d) {
        $scope.subarea = d;
        $mdDialog.show({
            scope: $scope,
            templateUrl: url +'/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            list(params);
            $scope.subarea = {};
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

    $scope.save = function(nombre) {
        if ($scope.subarea.id) {

            API.Subarea.update({ id: $scope.subarea.id }, $scope.subarea).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se Actualizo correctamente');
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });

        } else {
            $scope.subarea = {};
            $scope.subarea = {'nombre': nombre};
            if (buscarSA(nombre, $scope.lista) == nombre) {
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
        }
    };

    $scope.delete = function(d){
    var confirm = $mdDialog.confirm()
        .title('Desea Elminar Subarea')
        .textContent('Esta Subarea se eliminará')
        .ariaLabel('Lucky day')
        .targetEvent()
        .ok('SI')
        .cancel('NO');
    $mdDialog.show(confirm).then(function(){
        API.Subarea.delete({id: d.id}).$promise.then(function(r){
            console.log("r: " + r);
            toastr.info('Se elimino correctamente');
            list(params);
        }, function(err){
            console.log("Err" + err);
        });
    }, function(){
        console.log("no elimino");
    });
    };

});
