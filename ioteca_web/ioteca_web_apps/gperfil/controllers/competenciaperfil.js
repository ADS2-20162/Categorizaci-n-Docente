app

    .controller("ConfCompetenciaPerfilCtrl", function($scope, API, $window, $stateParams, $mdDialog, toastr, $timeout){
        var url = 'ioteca_web_apps/gperfil/views';
        var sap_id = $stateParams.sap_id;
        var areaperfil = $stateParams.areaperfil;
        var subarea_id = $stateParams.subarea_id;
        $scope.lista_CP = [];
        $scope.saperfil = [];

        //================================================================
        function llamar(){
            API.SubareaPerfil.get({id:sap_id}).$promise.then(function(r){
            $scope.saperfil = r;
                API.CompetenciaPerfil.list({'aperfil':$scope.saperfil.areaperfil, 'subarea':$scope.saperfil.subarea_id}).$promise.then(function(r){
                    $scope.lista_CP = r;
                    $scope.suma = contarId($scope.lista_CP);
                    $scope.resta = 100 - $scope.suma;  
                    $scope.listarCompetencia();
                });
            });
        }
        llamar();

        
        //para regresar al anterior windows..
        $scope.goBack = function() {
        window.history.back();
        };

        // function para comparar si el elmento existe en un Vector (elemento, venctor)
        function buscarC(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['competencia']) {
                    return v[i]['competencia'];
                }  
            }
        }

        //========================================================
        //listar para el total del ponderado
        //========================================================
        list = function() {
        API.CompetenciaPerfil.list().$promise.then(function(r) {
                $scope.lista = r;
            });
        };
        list();


        //listar competencias
        $scope.listarCompetencia = function(){
           API.Competencia.list().$promise.then(function(r){
               $scope.lista_comp = r.results; 
               ponderado = null;  
               compare();              
           }, function(err){
                console.log("Error al listar "+err); 
           });
        };
        $scope.listarCompetencia();

        //listar las competencias que son agregadas a un perfil
        listarCompetenciaPerfil = function(){
           API.CompetenciaPerfil.list({subareaperfil:sap_id}).$promise.then(function(r){
               $scope.lista_cp = r; 
               // $scope.suma = contarId($scope.lista_cp);
               // $scope.resta = 100 - $scope.suma;  
           }, function(err){
                console.log("Error al listar "+err); 
           });
        };
        listarCompetenciaPerfil();

        // listaCompPerfil = function(){
        //     API.CompetenciaPerfil.list({subarea:$scope.saperfil.subarea_id}).$promise.then(function(r){
        //        $scope.listacp= r; 
        //        $scope.suma = contarId($scope.listacp);
        //        $scope.resta = 100 - $scope.suma;  
        //     });
        // };
        // listaCompPerfil();

    //====================================================================
        // Aqui agragamos una competencia a un perfil utilizando la funcion 
        // buscarC para no guardar repetidos
    //====================================================================
    $scope.guardarCP = function (subarea,competencia,ponderado){
        $scope.competenciaperfil = {};
        $scope.competenciaperfil = { 'subareaperfil': subarea, "competencia":competencia, "ponderado":ponderado};
            
    if (ponderado != null) {
        if (buscarC(competencia, $scope.lista_cp) == competencia) {
        $scope.competenciaperfil = {ponderado: ''};
        toastr.error('La Competencia ya existe');
        } else {
                if (($scope.resta) >= ponderado) {
                    API.CompetenciaPerfil.save($scope.competenciaperfil).$promise.then(function(r) {
                    console.log("r: " + r);
                    $scope.competenciaperfil = {};
                    toastr.success('Se agrego correctamente');
                    listarCompetenciaPerfil();
                    list();
                    llamar();
                    }, function(err) {
                        console.log("Err " + err  );
                    }); 
                } else {
                    toastr.error('El total del ponderado sobrepasa');
                }
        }
    } else {
        toastr.warning('Ingrese un ponderado valido de (1-100)');
    }  
    $scope.listarCompetencia();           
     }; 

    //====================================================================
     //competecias
    //====================================================================
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    //====================================================================
    //funcion para sumar los ponderados del Area
    //====================================================================
    function contarId(lista){
        var cont = 0;
        for(var f in lista){
            if (lista[f].ponderado) {
                cont=cont+lista[f].ponderado; 
            }
        }
        return cont;    
    }

    //====================================================================
    //mdDialog para nuevas competencias
    //====================================================================
    $scope.new = function(evt) {
        $scope.competencia = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: url +'/competencia/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            $scope.list(params);
        }, function() {});
    };

    //====================================================================
    //end mdDialog para guardar las nuevas competencias que se agrega
    //====================================================================
    $scope.save = function() {
            API.Competencia.save($scope.competencia).$promise.then(function(r) {
                console.log("r: " + r);
                $scope.listarCompetencia();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
    };

    //====================================================================
    //para elmiminar las competencias del perfil
    //====================================================================
    $scope.delete = function(d) {
        var confirm = $mdDialog.confirm()
          .title('Desea Eliminar Competencia?')
          .textContent('Esta Competencia se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
        $mdDialog.show(confirm).then(function() {
                API.CompetenciaPerfil.delete({ id: d.id }).$promise.then(function(r) {
                    console.log("r: " + r);
                    listarCompetenciaPerfil();
                    list();
                    toastr.info('Se elimino correctamente');
                }, function(err) {
                    console.log("Err " + err);
                });
            },function() {
          console.log("no elimino");
        });
    };

    //====================================================================
    //para mostrar el input de editar ponderado
    //====================================================================
    $scope.showInput = function(d,html_id){  
        d.isEditable = true;
        $timeout(function() {
            var element = $window.document.getElementById(html_id);
            if(element)
              element.focus();
          });
    };

    //====================================================================
    //funcion para eventos del teclado
    //====================================================================
    $scope.editPtj = function(e,d){        
        switch(e.keyCode){
            case 27:                        //teclado ESC sin guardar o calcel
                d.isEditable = false;
                listarCompetenciaPerfil();
                break;
            case 13:                        //teclado INTRO para guardar la actualizacion del ponderado mediante el Input
                if (d.ponderado!=null) {
                    if (($scope.resta) >= d.ponderado) {
                        API.CompetenciaPerfil.update({ id: d.id }, d).$promise.then(function(r) {
                                console.log("r: " + r);
                                toastr.success('Se Actualizo Satisfactoriamente');
                                listarCompetenciaPerfil();
                            }, function(err) {
                                console.log("Err " + err);
                            });
                    } else {
                        toastr.error('El total del ponderado sobrepasa');
                    }
                } else {
                    toastr.warning('Ingrese poderado valido 1-100');
                }
                d.isEditable = false;
                break;
        }
    };

    //====================================================================
    //======Funcion para ocultar INPUT al hacer clic fuera del input===///
    //====================================================================
    $scope.ocultarInput = function(d){          //funcion para ocultar al hacer click fura del input
        d.isEditable = false;
        listarCompetenciaPerfil();
    };

    //================================================================
    //funcion filterstart
    //================================================================
    function compare(){
        for (var j = 0; j < $scope.lista_CP.length ; j++) {
            for (var i = 0; i < $scope.lista_comp.length ; i++) {
                if($scope.lista_comp[i].nombre===$scope.lista_CP[j].competencia){
                    $scope.lista_comp.splice(i,1);
                }
            }                 
        }
    }
    compare();

}) 


    .controller("CompetenciaPerfilCtrl", function($scope, API, $window, $stateParams, $mdDialog) {
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista = [];
    $scope.competenciaperfil = {};

    list = function(params) {
        API.CompetenciaPerfil.list(params).$promise.then(function(r) {
            $scope.lista = r;
            $scope.options = r.options;
        });
    };
    list(params);

    $scope.delete = function(d) {
        var confirm = $mdDialog.confirm()
          .title('Desea Eliminar Area?')
          .textContent('Esta Area se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
        $mdDialog.show(confirm).then(function() {
            API.CompetenciaPerfil.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.info('Se elimino correctamente');
                list(params);
            }, function(err) {
                console.log("Err " + err);
            });
        });
    };

});
