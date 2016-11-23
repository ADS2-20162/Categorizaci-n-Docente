app
    .controller('ItemsCtrl', function($scope, config_auths,ApiUser, $filter,$mdDateLocale,$window, $stateParams, $mdDialog, toastr, $timeout, $interval){
        var params = {};
        var url = 'ioteca_web_apps/user/views';
        var rleg = config_auths.rlegUrl + 'elementoCampoRegistro/';
        $scope.lista = [];
        $scope.listaE = [];
        $scope.listaEC = [];
        $scope.listaECR = [];
        $scope.listaECPR = [];
        $scope.listaP = [];
        $scope.registro = {} ;
    // var self = this;      

        function list(params){//esta es la funcion para listar los items y al vez Subitems y seccion
            ApiUser.Item.list(params).$promise.then(function(r){
                console.log(r.results);
                $scope.lista = r.results;
                $scope.options = r.options;
            }, function(err){
                console.log("Err" +err);
            });
        }
        list(params);

        function elementoList(params){
            ApiUser.Elemento.list(params).$promise.then(function(r){
                $scope.listaE = r.results;
                $scope.options = r.options;
            }, function(err){
                console.log("Err" + err);
            });
        }
        elementoList(params);

        $scope.listarElementCampReg = function(){
            ApiUser.ElementoCampoRegistro.list().$promise.then(function(r){
                $scope.listaECR = r.results;
            }, function(err){
                console.log("Err" + err);
            });
        }
        $scope.listarElementCampReg(); 

        $scope.listarElementCampPred = function(){
            ApiUser.ElementoCampoPredefinido.list().$promise.then(function(r){
                $scope.listaECP = r;
                var limitStep = 2;
                $scope.limite = limitStep;
            }, function(err){
                console.log("err" + err);
            });
        }
        $scope.listarElementCampPred();

        $scope.listarElementCampPredReg = function(){
            ApiUser.ElementoCampoPredefinidoRegistro.list().$promise.then(function(r){
                $scope.listaECPR = r.results;
            }, function(err){
                console.log("err" + err);
            });
        }
        $scope.listarElementCampPredReg();

        $scope.listPerson = function(){
          ApiUser.Persona.list(params).$promise.then(function(r){
            $scope.listaP = r.results;
          }, function(err){
            console.log("Err" +err);
          });    
        };
        $scope.listPerson(); 

        $scope.listElemCam = function() {  
          ApiUser.ElementoCampo.list().$promise.then(function(r) {
              $scope.listaEC = r.results;
              var limitStep = 3;
              $scope.limit = limitStep;
          }, function(err) {
            console.log("Err " + err);
          });
        };
        $scope.listElemCam();


        $scope.listAll = function() {
          params.all = true; //así debe quedar
          $scope.listarElementCampReg(); 
        };
        
        $scope.listRegimenPension = function() {
            ApiUser.RegimenPension.list().$promise.then(function(r) {
                $scope.listaRegPen = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listRegimenPension();
        
        $scope.listCategoriaAcademica = function() {
            ApiUser.CategoriaAcademica.list().$promise.then(function(r) {
                $scope.listaCatAcad = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listCategoriaAcademica();

        $scope.listCargoOcupado = function() {
            ApiUser.CargoOcupado.list().$promise.then(function(r) {
                $scope.listaCarOcup = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listCargoOcupado();

        $scope.listInstitucion = function() {
            ApiUser.Institucion.list().$promise.then(function(r) {
                $scope.listaInst = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listInstitucion();

        $scope.listIdioma = function() {
            ApiUser.Idioma.list().$promise.then(function(r) {
                $scope.listaIdio = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listIdioma();

        $scope.listGradoAcademico = function() {
            ApiUser.GradoAcademico.list().$promise.then(function(r) {
                $scope.listaGradAcad = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listGradoAcademico();

        $scope.listEspecialidad = function() {
            ApiUser.Especialidad.list().$promise.then(function(r) {
                $scope.listaEspec = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listEspecialidad();

        $scope.listProcesoGradoAcademico = function() {
            ApiUser.ProcesoGradoAcademico.list().$promise.then(function(r) {
                $scope.listaProcGradAcad = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listProcesoGradoAcademico();

        $scope.listCodigoPostal = function() {
            ApiUser.CodigoPostal.list().$promise.then(function(r) {
                $scope.listaCodPostal = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listCodigoPostal();

        $scope.listPais = function() {
            ApiUser.Pais.list().$promise.then(function(r) {
                $scope.listaPais = r;
            }, function(err) {
                console.log("Err list contr " + err);
            }); 
        };
        $scope.listPais();

        // LISTADO DE ELEMENTO CAMPO REGISTRO y ELEMENTO CAMPO PREDETERMINADO REGISTRO 
        // REGISTRO PARA la vista subitem.html
        $scope.subitem_registro = function() {
            ApiUser.Elemento.list().$promise.then(function(r){
                $scope.listaE = r.results;
            }, function(err){
                console.log("Err" + err);
            }); 
            ApiUser.ElementoCampo.list().$promise.then(function(r) {
                $scope.listEC = r.results;
                
                ApiUser.ElementoCampoRegistro.list().$promise.then(function(r){                
                    $scope.listECR = r.results;
                    // Verificando que por menos tenga datos guardados
                    if($scope.listECR.length != 0 ){
                        elemen_reg = [];
                        var e = $scope.listaE.length;
                        var ec = $scope.listEC.length;
                        var ecr = $scope.listECR.length; 
                        
                        if(e > 0){
                            elemen_camp = [];
                            for (var i = 0; i < e; i++){
                                elemento = [];
                                for (var j = 0; j < ec; j++){
                                    if($scope.listaE[i].nombre == $scope.listEC[j].elemento.nombre){
                                        elemento.push($scope.listEC[j]);
                                    }
                                };
                                elemen_camp.push(elemento);
                            }
                            elemen_camp_reg = [];
                            for (var i = 0; i < e; i++){
                                elemento = [];
                                for (var j = 0; j < ecr; j++){
                                    if($scope.listaE[i].nombre == $scope.listECR[j].elemento_campo.elemento.nombre){
                                        elemento.push($scope.listECR[j]);
                                    }
                                }
                                elemen_camp_reg.push(elemento);                                    
                            }

                            for (var i = 0; i < elemen_camp.length; i++){
                                if($scope.listaE[i].nombre == elemen_camp[i][0].elemento.nombre){
                                    ECR = [];
                                    for (var j = 0; j < elemen_camp_reg.length; j++){                                        
                                        if(elemen_camp_reg[j].length > 0 && $scope.listaE[i].nombre == elemen_camp_reg[j][0].elemento_campo.elemento.nombre){
                                            var count = 0;
                                            for (var k = 0; k < elemen_camp_reg[j].length/elemen_camp[i].length; k++){
                                                reg = []
                                                var num = count;
                                                for (var g = 0; g < elemen_camp[i].length; g++){
                                                    reg.push(elemen_camp_reg[j][num]);
                                                    num++;
                                                }
                                                ECR.push(reg);
                                                count = count + elemen_camp[i].length;
                                            }
                                        }
                                    }
                                    elemen_reg.push(ECR);
                                }
                            }
                            var l = [];
                            for (var i = 0; i < elemen_reg.length; i++){
                                l = l.concat(elemen_reg[i]);
                            }
                            elemen_reg = l;
                        }
                        //     for (var i = 0; i < $scope.listECR.length/ec; i++) {
                        //         reg = [];
                        //         var num = count;
                        //         for (var j = 0; j < ec; j++){                                
                        //             reg.push($scope.listECR[num]);
                        //             num++;
                        //         }
                        //         elemen_reg.push(reg);
                        //         count = count + ec;
                        //     }
                        $scope.subitemRegistro = elemen_reg;
                    }
                    else{
                        $scope.subitemRegistro = []
                    }
                }, function(err){
                    console.log("Err" + err);
                });                
            }, function(err) {
                console.log("Err " + err);
            });

            ApiUser.ElementoCampoPredefinido.list().$promise.then(function(r){
                $scope.listECP = r;
                
                ApiUser.ElementoCampoPredefinidoRegistro.list().$promise.then(function(r){
                    $scope.listECPR = r.results;
                    // Verificando que por menos tenga datos guardados
                    if($scope.listECPR.length != 0 ){
                        elemen_reg_pred = [];
                        var e = $scope.listaE.length;
                        var ecp = $scope.listECP.length;
                        var ecpr = $scope.listECPR.length; 
                        
                        if(e > 0){
                            elemen_camp_pred = [];
                            for (var i = 0; i < e; i++){
                                elemento = [];
                                for (var j = 0; j < ecp; j++){
                                    if($scope.listaE[i].nombre == $scope.listECP[j].elemento.nombre){
                                        elemento.push($scope.listEC[j]);
                                    }
                                };
                                elemen_camp_pred.push(elemento);
                            }
                            elemen_camp_pred_reg = [];
                            for (var i = 0; i < e; i++){
                                elemento = [];
                                for (var j = 0; j < ecr; j++){
                                    if($scope.listaE[i].nombre == $scope.listECPR[j].elemento_campo_pred.elemento.nombre){
                                        elemento.push($scope.listECPR[j]);
                                    }
                                }
                                elemen_camp_pred_reg.push(elemento);                                    
                            }

                            for (var i = 0; i < elemen_camp_pred.length; i++){
                                if($scope.listaE[i].nombre == elemen_camp_pred[i][0].elemento.nombre){
                                    ECPR = [];
                                    for (var j = 0; j < elemen_camp_pred_reg.length; j++){                                        
                                        if(elemen_camp_pred_reg[j].length > 0 && $scope.listaE[i].nombre == elemen_camp_pred_reg[j][0].elemento_campo_pred.elemento.nombre){
                                            var count = 0;
                                            for (var k = 0; k < elemen_camp_pred_reg[j].length/elemen_camp_pred[i].length; k++){
                                                reg = []
                                                var num = count;
                                                for (var g = 0; g < elemen_camp_pred[i].length; g++){
                                                    reg.push(elemen_camp_pred_reg[j][num]);
                                                    num++;
                                                }
                                                ECPR.push(reg);
                                                count = count + elemen_camp_pred[i].length;
                                            }
                                        }
                                    }
                                    elemen_reg_pred.push(ECPR);
                                }
                            }
                            var l = [];
                            for (var i = 0; i < elemen_reg_pred.length; i++){
                                l = l.concat(elemen_reg_pred[i]);
                            }
                            elemen_reg_pred = l;
                        }                    
                        $scope.subitemPredeterRegistro = elemen_reg_pred;
                    }
                    else{
                        $scope.subitemPredeterRegistro = []
                    }                    
                }, function(err){
                    console.log("err" + err);
                }); 
            }, function(err){
                console.log("err" + err);
            }); 
        };
        $scope.subitem_registro();
        // FIN de listado de los 2 Registros

        $scope.cancel = function() {
            $mdDialog.cancel();
        };
    //progress linear
        var vm = this;
        vm.loading = true;
        vm.toggleLoading = function() {
          vm.loading = !vm.loading;
        };        

        $scope.subitemnew = function(evt,subitem) {
            $scope.subitem = subitem.nombre;            
            ApiUser.DataCampo.list().$promise.then(function(r) {
                $scope.listDC = r;
            }, function(err) {
                console.log("Err list contr " + err);
                toastr.error("Ocurrio un problema al listar Data Campos, intente nuevamene","Error");
            }); 
            $scope.registro.persona = $scope.listaP[0].nombres;
            // $scope.registro.id = null;
            // $scope.registro = {};
            // $scope.registro.elemento_campo = i.elemento_campo.id;
            $mdDialog.show({
                scope: $scope,
                targetEvent: evt,
                templateUrl: url +'/legajo/subitem.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                preserveScope: true,
            }).then(function() {
                $scope.listarElementCampReg(); 
                $scope.listarElementCampPredReg();
                $scope.subitem_registro();
            }, function() {});
        };        
        $scope.reg = function(listaECR,subitem) {
            ApiUser.DataCampo.list().$promise.then(function(r) {
                $scope.listDC = r;
            }, function(err) {
                console.log("Err list contr " + err);
                toastr.error("Ocurrio un problema al listar Data Campos, intente nuevamene","Error");
            }); 
            $scope.listaECR = listaECR;
            $scope.registro.persona = $scope.listaP[0].nombres; 
            for(var i=0; i<$scope.listaECR.length;i++){
                if($scope.listaECR[i].d_fecha){
                    var fecha = $scope.listaECR[i].d_fecha.split("-");
                    fecha = fecha.join("/");
                    $scope.listaECR[i].d_fecha = new Date(fecha);
                }
            };
            $scope.subitem = subitem.nombre;

            $mdDialog.show({
                scope: $scope,
                templateUrl: url +'/legajo/subitem_update.html',
                parent: angular.element(document.body),
                clickOutsideToClose: false,
                preserveScope: true,
            }).then(function() {
                $scope.listarElementCampReg(); 
                $scope.listarElementCampPredReg();
                $scope.subitem_registro();
            }, function() {});
        };

        function buscarI(a, v){           //function (elemento, venctor)
            for (var i = 0; i < v.length; i++) {  //funcion para buscar un elemento en la lista
                if (a == v[i]['data']) {      //para no guardar un nombre del item repetidas veces..
                    return v[i]['data'];
                }  
            }
      }

        $scope.saveRegistro = function() {  //elemento_campo,persona,data             
            registros = [];
            for(var i=0; i<$scope.listaEC.length;i++){
                var formData = new FormData();
                if($scope.listaEC[i].d_string){
                    dic = {
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_string': $scope.listaEC[i].d_string,
                    }
                    registros.push(dic);
                } 
                else if ($scope.listaEC[i].d_texto){
                    dic = {
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_texto': $scope.listaEC[i].d_texto,
                    }
                    registros.push(dic);
                }
                else if ($scope.listaEC[i].d_number){
                    dic = {
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_number': $scope.listaEC[i].d_number,
                    }
                    registros.push(dic);
                }
                else if ($scope.listaEC[i].d_decimal){
                    dic = {
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_decimal': $scope.listaEC[i].d_decimal,
                    }
                    registros.push(dic);
                }
                else if ($scope.listaEC[i].d_fecha){
                    var date =  $scope.listaEC[i].d_fecha;
                    var dia = date.getDate();
                    var mes = date.getMonth()+1;
                    var anio = date.getFullYear();
                    var fecha = [anio,mes,dia]
                    fecha = fecha.join("/");
                    $mdDateLocale.formatDate = function(fecha) {
                        return moment(date).format('YYYY-MM-DD');
                    }; 
                    dic = {
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_fecha': $mdDateLocale.formatDate(),
                    }
                    registros.push(dic);
                }
                else if ($scope.listaEC[i].d_url){
                    dic = {
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_url': $scope.listaEC[i].d_url,
                    }
                    registros.push(dic);
                }
                else if($scope.listaEC[i].select){
                    dic = {                
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_string': $scope.listaEC[i].select,
                    }
                    registros.push(dic);
                }
                else if($scope.listaEC[i].d_imagen){
                    dic = {
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_imagen': $scope.listaEC[i].d_imagen,
                    }
                    registros.push(dic);
                }
                else if($scope.listaEC[i].d_archivo){                    
                    dic = {
                        'set_elemento_campo': $scope.listaEC[i].id,
                        'persona': $scope.registro.persona,
                        'd_archivo': $scope.listaEC[i].d_archivo,
                    }
                    registros.push(dic);
                }
            }
            ApiUser.ElementoCampoRegistro.save(registros).$promise.then(function(r){
                console.log("r: " + r);
            }, function(err) {
                console.log("Err" + err);
            });

            // reg_predeter = [];
            // for(var i=0; i<$scope.listaECP.length;i++){
            //     if($scope.listaECP[i].regimen_pension){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].regimen_pension,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].categoria_academica){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].categoria_academica,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].cargo_ocupado){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].cargo_ocupado,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].institucion){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].institucion,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].idioma){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].idioma,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].grado_academico){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].grado_academico,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].especialidad){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].especialidad,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].proceso_grado_academico){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].proceso_grado_academico,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].codigo_postal){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].codigo_postal,
            //         }
            //         reg_predeter.push(dic)
            //     }
            //     else if($scope.listaECP[i].pais){
            //         dic = {
            //             'set_elemento_campo_pred': $scope.listaECP[i].id,
            //             'persona': $scope.registro.persona,
            //             'data': $scope.listaECP[i].pais,
            //         }
            //         reg_predeter.push(dic)
            //     }
            // }
            // ApiUser.ElementoCampoPredefinidoRegistro.save(reg_predeter).$promise.then(function(r){
            //     console.log("r: " + r);
            // }, function(err) {
            //     console.log("Err" + err);
                // toastr.error('Error al guardar, de REGISTROS PREDETERMINADOS');
            // });
            toastr.success("Se guardó correctamente.");
            $mdDialog.hide();
      };  

        $scope.saveRegistroUpdate = function() {
            registros = [];
            for(var i=0; i<$scope.listaECR.length;i++){
                if($scope.listaECR[i].d_string){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,
                        'persona': $scope.registro.persona,
                        'd_string': $scope.listaECR[i].d_string,
                    }
                } 
                else if ($scope.listaECR[i].d_texto){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id, 
                        'persona': $scope.registro.persona,
                        'd_texto': $scope.listaECR[i].d_texto,
                    }
                }
                else if ($scope.listaECR[i].d_number){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,  
                        'persona': $scope.registro.persona,
                        'd_number': $scope.listaECR[i].d_number,
                    }
                }
                else if ($scope.listaECR[i].d_decimal){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,   
                        'persona': $scope.registro.persona,
                        'd_decimal': $scope.listaECR[i].d_decimal,
                    }
                }
                else if ($scope.listaECR[i].d_fecha){
                    var date =  $scope.listaECR[i].d_fecha;
                    var dia = date.getDate();
                    var mes = date.getMonth()+1;
                    var anio = date.getFullYear();
                    var fecha = [anio,mes,dia]
                    fecha = fecha.join("/");
                    $mdDateLocale.formatDate = function(fecha) {
                        return moment(date).format('YYYY-MM-DD');
                    };
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,    
                        'persona': $scope.registro.persona,
                        'd_fecha': $mdDateLocale.formatDate(),
                    }
                    // toastr.success(dic.d_fecha);
                }
                else if ($scope.listaECR[i].d_url){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,     
                        'persona': $scope.registro.persona,
                        'd_url': $scope.listaECR[i].d_url,
                    }
                }
                else if($scope.listaECR[i].select){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,
                        'persona': $scope.registro.persona,
                        'd_string': $scope.listaECR[i].select,
                    }
                }
                else if($scope.listaECR[i].d_imagen){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id, 
                        'persona': $scope.registro.persona,
                        'd_imagen': $scope.listaECR[i].d_imagen,
                    }
                }
                else if($scope.listaECR[i].d_archivo){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,  
                        'persona': $scope.registro.persona,
                        'd_archivo': $scope.listaECR[i].d_archivo,
                    }
                }
                ApiUser.ElementoCampoRegistro.update({id:$scope.listaECR[i].id},dic).$promise.then(function(r){
                    console.log("r: " + r);
                }, function(err) {
                    console.log("Err" + err);
                }); 
            }                
            toastr.success("Se actualizó correctamente."); 
            $mdDialog.hide();            
        };

        $scope.delReg = function(listaECR) {
          var confirm = $mdDialog.confirm()
            .title('Desea Eliminar este Registro')
            .textContent('Este registro se eliminara y ya no podra encontrar en su SUBITEM')
            .ariaLabel('Lucky day')
            .ok('SI')
            .cancel('NO');
          $mdDialog.show(confirm).then(function(){
              $scope.listaECR = listaECR;
              for(var i = 0; i < $scope.listaECR.length; i++){
                  ApiUser.ElementoCampoRegistro.delete({id:$scope.listaECR[i].id}).$promise.then(function(r){
                      $scope.listarElementCampReg(); 
                      $scope.listarElementCampPredReg();
                      $scope.subitem_registro();
                  }, function(err){
                      console.log("Err" +err);
                  });    
              }            
              toastr.info('Se Eliminó Correctamente');
              console.log("Eliminado");
          }, function(){
            console.log("No se ha Eliminado");
          });
        };
     
    });

 
