app

    .controller("EscalaDimensionCtrl", function($scope, API, $window, $stateParams, $mdDialog, toastr, $timeout) {

    //Valores iniciales
    var url = 'ioteca_web_apps/gperfil/views';
    var perfil_id = $stateParams.perfil_id;
    var dp_id = $stateParams.dp_id; 
    var params = {};
    params.page = $stateParams.page ? $stateParams.page : 1;
    params.page_size =  5;
    $scope.lista_edp = [];
    $scope.lista_esc = [];
    $scope.escala = {};
    $scope.dimensionescala = {};
    $scope.listDim  = [];

    //================================================================
    //Lista para el filtro
    //================================================================
    function llamar(){
        API.DimensionPerfil.get({ id:dp_id }).$promise.then(function(r){
        $scope.dimperfil = r;
            API.EscalaDimension.list({perfil:$scope.dimperfil.perfil_id}).$promise.then(function(r){
                $scope.lista_esc = r;
                listaEscala();
            });
        });
    }
    llamar();

    //================================================================
    //Lista para el escala dimension
    //================================================================
    list = function() {
        API.EscalaDimension.list().$promise.then(function(r) {
            $scope.lista = r;
        });
    };
    list();

    listadim = function(){
        API.Dimension.list().$promise.then(function(r){
            $scope.listDim = r.results;
        });
    };
    listadim();

    $scope.goBack = function() {
    window.history.back();
    };
    
    //================================================================
    //listar las escalas disponibles para ser agregadas a un Dimension
    //================================================================
    listaEscala = function(){
        API.Escala.list().$promise.then(function(r){
            $scope.lista_es = r.results;
            puntaje = null;
            compare();
        }, function(err){
            console.log("Error Escala"+err);
        });
    };
    listaEscala();

    //================================================================
    //listar las escalas añadidas a un dimension
    //================================================================
    listaEscalaDimension = function() {
        API.EscalaDimension.list({dimensionperfil:dp_id}).$promise.then(function(r) {
            $scope.lista_edp = r;
        }, function(err) {
           console.log("Error en lista_edp " + err);
        });
    };
    listaEscalaDimension();

    //================================================================
    //guardar escalas comparando la existencia de los que ya estan 
    //agragadas a la lsita de escalas agregadas
    //================================================================
    $scope.guardarEscalaD = function ( dimensionperfil, escala, puntaje){
        $scope.dimensionescala = {};
        $scope.dimensionescala = { 'dimensionperfil': dimensionperfil, 'escala':escala, 'puntaje':puntaje};
        if(puntaje != null){
            API.EscalaDimension.save($scope.dimensionescala).$promise.then(function(r) {
            console.log("r: " + r);
            toastr.success('Se agrego correctamente');
            listaEscalaDimension(); 
            llamar();        
            }, function(err) {
                console.log("Err " + err  );
            });
        }else{
            toastr.warning('Ingrese un Puntaje Valido < 100');
        } 
        listaEscala();      
     };

    $scope.buscar = function() {
        params.page = 1;
        params.fields = 'nombre';
        params.query = $scope.query;
        params.page_size= $scope.per;
        $scope.list(params);
    };


    //mdDialog
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

    //================================================================
    // agregar nueva Dimension
    //================================================================
    $scope.new = function(evt) {
        $scope.dimension = {};
        $mdDialog.show({
            scope: $scope,
            targetEvent: evt,
            templateUrl: url +'/escala/formd.html',
            parent: angular.element(document.body),
            clickOutsideToClose: false,
            preserveScope: true,
        }).then(function() {
            listaEscala();
        }, function() {});
    };

    //================================================================
    //function (elemento, venctor)
    //funcion para buscar un elemento en la lista
    //para no guardar un nombre del Escala repetidas veces..
    //================================================================
    function buscarE(a, v){
            for (var i = 0; i < v.length; i++) {
                if (a == v[i]['nombre']) {
                    return v[i]['nombre'];
                }  
            }
    }

    //================================================================
    //guardar la nueva escala 
    //================================================================
    $scope.save = function(nombre) {
        $scope.escala = {};
        $scope.escala = {'nombre': nombre};
        console.log(nombre);
        if (buscarE(nombre, $scope.lista_es) == nombre) {
            toastr.error('La Escala '+nombre+' ya existe');
        } else {
            API.Escala.save($scope.escala).$promise.then(function(r) {
                console.log("r: " + r);
                listaEscala();
                $mdDialog.hide();
            }, function(err) {
                console.log("Err " + err);
            });            
        }
    };

    //================================================================
    //para quitar la escala agregada a una dimension
    //================================================================
    $scope.deleteEscDim = function(d) {
        var confirm = $mdDialog.confirm()
          .title('Desea Eliminar Escala?')
          .textContent('Esta Escala se eliminará y ya no podrás encontrarla')
          .ariaLabel('Lucky day')
          .targetEvent()
          .ok('SI')
          .cancel('NO');
        $mdDialog.show(confirm).then(function() {
            API.EscalaDimension.delete({ id: d.id }).$promise.then(function(r) {
            toastr.info('Se elimino correctamente');
            listaEscalaDimension();
            llamar();
            }, function(err) {
                console.log("Err " + err);
            });
        }, function() {
          console.log("no elimino");
        });
    };

    //=================================================================
    //para eliminar las escalas 
    //=================================================================
    $scope.delete = function(d) {
        var confirm = $mdDialog.confirm()
              .title('Desea Eliminar Escala?')
              .textContent('Esta Escala se eliminará')
              .ariaLabel('Lucky day')
              .targetEvent()
              .ok('SI')
              .cancel('NO');
        $mdDialog.show(confirm).then(function() {
                API.Escala.delete({ id: d.id }).$promise.then(function(r) {
                    console.log("r: " + r);
                    toastr.info('Se elimino correctamente');
                    listaEscala();
                }, function(err) {
                    console.log("Err " + err);
                });
        });
      };

    //================================================================
    //para mostrar el input de editar ponderado
    //================================================================
    $scope.showInput = function(d,html_id){  
        d.isEditable = true;
        $timeout(function() {
            var element = $window.document.getElementById(html_id);
            if(element)
              element.focus();
          });
    };


    //================================================================
    //funcion para eventos del teclado
    //================================================================
    $scope.editPtj = function(e, d, puntaje){        
        switch(e.keyCode){
            case 27:                        //teclado ESC sin guardar o calcel
                d.isEditable = false;
                listaEscalaDimension();
                break;
            case 13:                        //teclado INTRO para guardar la actualizacion del ponderado mediante el Input
                $scope.num = {};
                $scope.num = {'puntaje':puntaje};
                if (puntaje != null) {
                    if(buscarP(puntaje, $scope.lista_edp) != puntaje){
                        toastr.error('Puntaje ' +puntaje+ " ya Existe");
                    }else{
                    API.EscalaDimension.update({ id: d.id }, d).$promise.then(function(r) {
                            console.log("r: " + r);
                            toastr.success('Se Actualizo Satisfactoriamente');
                            listaEscalaDimension();
                        }, function(err) {
                            console.log("Err " + err);
                        });
                    }
                } else {
                    toastr.warning('Ingrese un ponderado valido (1-100)');
                }
                d.isEditable = false;
                break;
        }
    };

    //================================================================
    //Funcion para ocultar INPUT al hacer clic fuera del input
    //================================================================
    $scope.ocultarInput = function(d){
        d.isEditable = false;
        listaEscalaDimension();
    };

    //================================================================
    //funcion filterstart
    //================================================================
    function compare(){
        for (var j = 0; j < $scope.lista_esc.length ; j++) {
            for (var i = 0; i < $scope.lista_es.length ; i++) {
                if($scope.lista_es[i].nombre===$scope.lista_esc[j].escala){
                    $scope.lista_es.splice(i,1);
                }
            }                 
        }
    }
    compare();


});
