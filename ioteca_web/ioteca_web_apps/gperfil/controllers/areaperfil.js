app

   .controller('PerfilAreaCtrl', function($scope, API, $state, $stateParams,$window, $mdDialog, toastr){
        var params = {};
        $scope.listaAP = [];

        function list(params) {
            API.AreaPerfil.list(params).$promise.then(function(r) {
                    $scope.listaAP = r;
                }, function(err) {
                });
            }
        list(params);

        //para eliminar area perfil
        $scope.delete = function(d) {
            var confirm = $mdDialog.confirm()
              .title('Desea Eliminar Area?')
              .textContent('Esta Area se eliminará y ya no podrás encontrarla')
              .ariaLabel('Lucky day')
              .targetEvent()
              .ok('SI')
              .cancel('NO');
            $mdDialog.show(confirm).then(function() {
                API.AreaPerfil.delete({ id: d.id }).$promise.then(function(r) {
                    console.log("r: " + r);
                    toastr.info('Se elimino correctamente');
                    list(params);
                }, function(err) {
                    console.log("Err " + err);
                });
            });
        };
   })
    

   .controller('AreaPerfilCtrl', function($scope, API, $state, $stateParams,$window, $mdDialog, toastr, $timeout) {
        var params = {};
        var url = 'ioteca_web_apps/gperfil/views';
        var perfil_id = $stateParams.perfil_id; 
        $scope.lista = [];
        $scope.seglista = [];
        $scope.perfil = API.Perfil.get({ id:perfil_id });
        $scope.lista_ap = [];
        $scope.lista_dp = [];
        $scope.listaD = [];

    $scope.buscar = function() {
        params.page = 1;
        // params.fields = 'nombre,direccion';
        params.fields = 'area';
        params.query = $scope.query;
        params.page_size= $scope.per;
        $scope.list(params);
    };

    //listar Dimensiones
    function listDimension() {
        API.Dimension.list(params).$promise.then(function(r) {
            $scope.listaD = r.results;
            $scope.options = r.options;
            compareDim();
        }, function(err) {
            console.log("Error al listar " + err);
        });
    }
    listDimension();


    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un area repetidas veces..
    function buscarA(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['area']) {
                    return v[i]['area'];
                }  
            }
    }

    $scope.guardarAreaPerfil  = function (area, perfil, ponderado){
        $scope.areaperfil = {}; 
        $scope.areaperfil = {'perfil':perfil, 'area': area, 'ponderado':ponderado,}; 

        if ((ponderado != null)) {
            if(buscarA(area, $scope.lista_ap) == area){
            toastr.error('El Area '+area+' ya existe');
            }else{
                if (($scope.resta) >= ponderado) {
                    API.AreaPerfil.save($scope.areaperfil).$promise.then(function(r) {
                    toastr.success('Se agrego correctamente');
                    listAreaPerfil();         
                    }, function(err) {
                        console.log("Err " + err  );
                    });
                }
                else {
                        toastr.error('El total del ponderado sobrepasa');
                }
            } 
        } else {
            toastr.warning('Ingrese un ponderado valido (1-100)');
        } 
        listarAreas();    
     };

    //funcion para sumar los ponderados del Area
    function contarId(lista){
        var cont = 0;
        for(var f in lista){
            if (lista[f].ponderado) {
                cont=cont+lista[f].ponderado; 
            }
        }
        return cont;    
    }

    //funcion filter las Areas start
    function compare(){
        'use estrict';
        for (var j = 0; j < $scope.lista_ap.length ; j++) {
            for (var i = 0; i < $scope.lista.length ; i++) {
                if($scope.lista[i].nombre===$scope.lista_ap[j].area){
                    $scope.lista.splice(i,1);
                }
            }                 
        }
    }
    compare();

    //listar areas disponibles para ser agregadas al perfil
    function listarAreas() {
        API.Area.list().$promise.then(function(r) {
            $scope.lista = r.results;
            compare();
            ponderado = null;
        }, function(err) {
           console.log("Err " + err);
        });
    }
    listarAreas();



    //listar las areas añadidas al perfil
    function listAreaPerfil() {
        API.AreaPerfil.list({perfil:perfil_id}).$promise.then(function(r) {
            $scope.lista_ap = r;
            compare();
            $scope.suma = contarId($scope.lista_ap);
            $scope.resta = 100 - $scope.suma;
        }, function(err) {
           console.log("Errr " + err);
        });
    }
    listAreaPerfil();

    
    //para quitar las areas agregadas a un perfil
    $scope.eliminarAPerfil = function(d) {
        var confirm = $mdDialog.confirm()
          .title('Desea Eliminar Area?')
          .textContent('Esta Area se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
        $mdDialog.show(confirm).then(function() {
            API.AreaPerfil.delete({ id: d.id }).$promise.then(function(r) {
                console.log("r: " + r);
                listarAreas();
                listAreaPerfil();
                toastr.info('Se elimino correctamente');
            }, function(err) {
                console.log("Err " + err);
            });
        });
    };


    //para quitar dimensiones agregradas a un perfil
    $scope.eliminarDPerfil = function(d) {
    var confirm = $mdDialog.confirm()
          .title('Desea Quitar Dimension?')
          .textContent('Esta Dimension se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
    $mdDialog.show(confirm).then(function() {
            API.DimensionPerfil.delete({ id: d.id }).$promise.then(function(r) {
                toastr.info('Se elimino correctamente');
                listDimension();
                listdimensionperfil();
            }, function(err) {
                console.log("Err " + err);
            });
        });
    };

    //mdDialog
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    //mdDialog para agregar nuevas areas
    $scope.new = function(evt) {
        $scope.area = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: url +'/area/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        });
    };

    //=========================================
    //mdDialog para agregar nuevas dimensiones
    //==========================================
    $scope.newDimension = function(evt) {
        $scope.dimension = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: url +'/dimension/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        });
    };


    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un nombre del Area repetidas veces..
    function buscarDim(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['nombre']) {
                    return v[i]['nombre'];
                }  
            }
    }

    //=======================================================
    //Guardar dimension
    //=====================================================
    $scope.saveDim = function(nombre) {
        $scope.dimension = {};
        $scope.dimension = {'nombre': nombre};
        if (buscarDim(nombre, $scope.listaD) == nombre) {
           toastr.error('La Dimension ya existe', 'Error'); 
        } else {
            API.Dimension.save($scope.dimension).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se agrego correctamente');
                listDimension();
                $mdDialog.hide();
            }, function(err) {
                console.log("Error al guardar " + err);
            });                
        }
    };

    
    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un nombre del area repetidas veces..
    function buscarN(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['nombre']) {
                    return v[i]['nombre'];
                }  
            }
    }

    //para guardar Nuevas areas
    $scope.save = function(nombre) {
        $scope.area = {};
        $scope.area = {'nombre': nombre};
        if (buscarN(nombre, $scope.lista) == nombre) {
            toastr.error('El Area '+nombre+' ya existe');
        } else {
            API.Area.save($scope.area).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se agrego correctamente');
                listarAreas();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });
        }
    };

    //Comparar Las Dimensiones
    function compareDim(){
        'use estrict';
        for (var j = 0; j < $scope.lista_dp.length ; j++) {
            for (var i = 0; i < $scope.listaD.length ; i++) {
                if($scope.listaD[i].nombre===$scope.lista_dp[j].dimension){
                    $scope.listaD.splice(i,1);
                }
            }                 
        }
    }
    compareDim();

    //listar las dimensiones agregadas a un Perfil
    function listdimensionperfil() {
        API.DimensionPerfil.list({perfil:perfil_id}).$promise.then(function(r) {
            $scope.lista_dp = r;
            compareDim();
        }, function(err) {
           console.log("Errr " + err);
        });
    }
    listdimensionperfil();

    //funcion para compara las dimensiones con una busqueda del elemnto en un con junto
    function buscarD(a, v){
        // function (elemento, venctor)
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['dimension']) {
                    return v[i]['dimension'];
                }  
            }
    }
    
    //agregar una dimension a un perfil comparando con la funcion buscarD().
    //para no guardar repetidas veces las dimensiones.
    $scope.guardarDimensionPerfil  = function (dimension, perfil){
        $scope.dimensionperfil = {};
        $scope.dimensionperfil = {'perfil':perfil, 'dimension': dimension};

        if (buscarD(dimension, $scope.lista_dp) == dimension) {
            toastr.error('La dimension  '+dimension+' ya existe');
        } else {
            API.DimensionPerfil.save($scope.dimensionperfil).$promise.then(function(r) {
                console.log("r: " + r);
                toastr.success('Se agrego correctamente');
                listdimensionperfil(); 
                listDimension();        
            }, function(err) {
                console.log("Err " + err  );
            });
        }        
     };

    $scope.showInput = function(d,html_id){  //para mostrar el input de editar ponderado
        d.isEditable = true;
        $timeout(function() {
            var element = $window.document.getElementById(html_id);
            if(element)
              element.focus();
          });
    };

    $scope.editPtj = function(e,d){        //funcion para eventos del teclado
        switch(e.keyCode){
            case 27:                        //teclado ESC sin guardar o calcel
                d.isEditable = false;
                listAreaPerfil();
                break;
            case 13:                        //teclado INTRO para guardar la actualizacion del ponderado mediante el Input
                if (d.ponderado!=null) {
                    if (($scope.resta) >= d.ponderado) {
                        API.AreaPerfil.update({ id: d.id }, d).$promise.then(function(r) {
                                console.log("r: " + r);
                                toastr.success('Se Actualizo Satisfactoriamente');
                                listAreaPerfil();
                            }, function(err) {
                                console.log("Err " + err);
                            });
                    } else {
                        toastr.error('El total del ponderado sobrepasa');
                    }
                } else {
                    toastr.warning('ingrese ponderado valido 1-100');
                }
        d.isEditable = false;
        break;
        }
    };

    //======Funcion para ocultar INPUT al hacer clic fuera del input===///
    $scope.ocultarInput = function(d){          //funcion para ocultar al hacer click fura del input
        d.isEditable = false;
        listAreaPerfil();
    };

});
