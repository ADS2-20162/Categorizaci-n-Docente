app.controller("ResumenCtrl", function($scope, $stateParams,$mdDialog,toastr, API, ApiUser) {
    var perfil_id = $stateParams.perfil_id; 
    $scope.perfil = API.Perfil.get({ id:perfil_id });


    $scope.listPerfil = function() {
        API.Perfil.list().$promise.then(function(r) {
            $scope.listaP = r.results;
            // $scope.options = r.options;
        }, function(err) {
           console.log("Err " + err);
        });
    };
    $scope.listPerfil();

    function listArea() {
        API.Area.list().$promise.then(function(r) {
            $scope.listaA = r.results;
            $scope.options = r.options;
        }, function(err) {
        });
    }
    listArea();

    //=========================================================================
    //listar las areas añadidas al perfil
    //=========================================================================
    function listRegistro() {
        ApiUser.Registro.list().$promise.then(function(r) {
            $scope.lista_re = r;
            // compare();
            // $scope.suma = contarId($scope.lista_re);
            // $scope.resta = 100 - $scope.suma;
            for (var i = 0; i < $scope.lista_re.length; i++) {
                console.log("es todo de registro"+ $scope.lista_re[i].escaladimension);
            }
        }, function(err) {
           console.log("Errr " + err);
        });
    }
    listRegistro();

    //=========================================================================
    //funcion para sumar los ponderados del Area del Perfil
    //=========================================================================
    function contarId(lista){      
        var cont = 0;
        for(var f in lista){
            if (lista[f].ponderado) {
                cont=cont+lista[f].ponderado; 
            }
        }
        return cont;    
    }

});
