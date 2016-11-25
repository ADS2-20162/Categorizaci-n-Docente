app
    .controller('ItemsCtrl', function($scope, ApiUser, config_auths, $http, $q, $filter,$mdDateLocale,$window, $stateParams, $mdDialog, toastr, $timeout, $interval){
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
            ApiUser.Persona.list(params).$promise.then(function(r){
                $scope.listaP = r.results;
                $scope.person_id = $scope.listaP[0].id;
            ApiUser.Elemento.list().$promise.then(function(r){
                $scope.listaE = r.results;            
            ApiUser.ElementoCampo.list().$promise.then(function(r) {
                $scope.listEC = r.results;
                ApiUser.ElementoCampoRegistro.list({persona:$scope.person_id}).$promise.then(function(r){  
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
                                if(elemento.length > 0){
                                    elemen_camp.push(elemento);
                                }
                            }
                            elemen_camp_reg = [];
                            for (var i = 0; i < e; i++){
                                elemento = [];
                                for (var j = 0; j < ecr; j++){
                                    if($scope.listaE[i].nombre == $scope.listECR[j].elemento_campo.elemento.nombre){
                                        elemento.push($scope.listECR[j]);
                                    }
                                }
                                elemento_order = [];
                                for(var y = 0; y < elemen_camp.length; y++) {
                                    if($scope.listaE[i].nombre == elemen_camp[y][0].elemento.nombre){
                                        var c = 0;
                                        for(var l = 0; l < elemento.length/elemen_camp[y].length; l++){
                                            var num = c;
                                            temp = [];
                                            for (var p = 0; p < elemen_camp[y].length; p++ ){
                                                temp.push(elemento[num]);
                                                num++;
                                            }
                                            c = c + elemen_camp[y].length;
                                            elemento_order.push(temp);
                                        }
                                    }
                                }

                                elemen_final = [];
                                for(var y = 0; y < elemen_camp.length; y++) {
                                    if($scope.listaE[i].nombre == elemen_camp[y][0].elemento.nombre){
                                        for(var l = 0; l < elemento_order.length; l++){
                                            temp = [];
                                            for(var h = 0; h < elemen_camp[y].length; h++){
                                                for(var f = 0; f < elemento_order[l].length; f++){
                                                    if(elemen_camp[y][h].nombre == elemento_order[l][f].elemento_campo.nombre){
                                                        temp.push(elemento_order[l][f]);
                                                    }
                                                }
                                            }
                                            elemen_final.push(temp);
                                        }
                                    }
                                }
                                var d = [];
                                for (var a = 0; a < elemen_final.length; a++){
                                    d = d.concat(elemen_final[a]);
                                }
                                elemento = d;
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
                                        elemento.push($scope.listECP[j]);
                                    }
                                };
                                if(elemento.length > 0){
                                    elemen_camp_pred.push(elemento);
                                }
                            }
                            elemen_camp_pred_reg = [];
                            for (var i = 0; i < e; i++){
                                elemento = [];
                                for (var j = 0; j < ecpr; j++){
                                    if($scope.listaE[i].nombre == $scope.listECPR[j].elemento_campo_pred.elemento.nombre){
                                        elemento.push($scope.listECPR[j]);
                                    }
                                }
                                if(elemento.length > 0){
                                    elemen_camp_pred_reg.push(elemento);                                    
                                }
                            }
                            for (var x = 0; x < e; x++){
                                for (var i = 0; i < elemen_camp_pred.length; i++){
                                    if($scope.listaE[x].nombre == elemen_camp_pred[i][0].elemento.nombre){
                                        ECPR = [];
                                        for (var j = 0; j < elemen_camp_pred_reg.length; j++){                                        
                                            if(elemen_camp_pred_reg[j].length > 0 && $scope.listaE[x].nombre == elemen_camp_pred_reg[j][0].elemento_campo_pred.elemento.nombre){
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
            }, function(err){
                console.log("Err" + err);
            });  
            }, function(err){
                console.log("Err" +err);
            });    
        };
        $scope.subitem_registro();
        // FIN de listado de los 2 Registros
        $scope.datorepetido=function(e,subitem){
            ApiUser.ElementoCampoRegistro.list({subitem:subitem}).$promise.then(function(r){     
                $scope.filterECR = r.results;
                for(var i = 0; i < $scope.filterECR.length; i++){
                    if(e == $scope.filterECR[i].d_string){
                        if(e == null){
                            toastr.error('Dato no definido');
                            break;
                        }
                        else{
                            toastr.info(e + " ya existe");
                            // $scope.e = '';
                            break;
                        }
                    }
                }
            }, function(err){
                console.log("Err" + err);
            });            
        };
        $scope.select_option = function(e){
            // $scope.visibility = true;
            $scope.select = e;
            // console.log($scope.select);
            if($scope.select != null){
                ApiUser.DataCampoOpcion.list({data_campo:e}).$promise.then(function(r) {
                    $scope.listDCO = r;
                }, function(err) {
                    console.log("Err list contr " + err);
                    toastr.error("Ocurrio un problema al listar Data Campos Opciones, intente nuevamene","Error");
                });  
            }            
        };
        
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
            
            $scope.fileName = '';
            ApiUser.ElementoCampoPredefinido.list({subitem:$scope.subitem}).$promise.then(function(r){
                $scope.listECP = r;
            }, function(err){
                console.log("err" + err);
            });

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
                for(var i = 0; i < $scope.listaEC.length; i++) {
                    $scope.listaEC[i].d_string = '';
                    $scope.listaEC[i].d_texto = '';
                    $scope.listaEC[i].select = '';
                    $scope.listaEC[i].select_option = '';
                    $scope.listaEC[i].d_url = '';
                    $scope.listaEC[i].d_fecha = null;
                    $scope.listaEC[i].d_number = null;
                    $scope.listaEC[i].d_decimal = null;
                    $scope.listaEC[i].d_imagen = null;
                    $scope.listaEC[i].d_archivo = null;
                }
            }, function() {});
        };       

        $scope.reg = function(listaECR,listaECPR,subitem) {
            $scope.registro.persona = $scope.listaP[0].nombres; 

            ApiUser.DataCampo.list().$promise.then(function(r) {
                $scope.listDC = r;
            }, function(err) {
                console.log("Err list contr " + err);
                toastr.error("Ocurrio un problema al listar Data Campos, intente nuevamene","Error");
            });

            $scope.subitem = subitem.nombre;

            ApiUser.ElementoCampoPredefinido.list({subitem:$scope.subitem}).$promise.then(function(r){
                $scope.listECP = r;
            }, function(err){
                console.log("err" + err);
            }); 

            $scope.listaECR = listaECR;
            for(var i=0; i<$scope.listaECR.length;i++){
                if($scope.listaECR[i].d_fecha){                    
                    var d = $scope.listaECR[i].d_fecha;
                    $scope.listaECR[i].d_fecha = new Date(d);
                }
                else if($scope.listaECR[i].d_select){
                    var select = $scope.listaECR[i].d_select;
                }
                else if($scope.listaECR[i].d_imagen){
                    var filename = $scope.listaECR[i].d_imagen.split('/')
                        filename = filename[filename.length - 1]
                    var file = new File([$scope.listaECR[i].d_imagen],filename)
                    $scope.fileName = file.name;
                    console.log(file);
                }
                else if($scope.listaECR[i].d_archivo){
                    var filename = $scope.listaECR[i].d_archivo.split('/')
                        filename = filename[filename.length - 1]
                    var file = new File([$scope.listaECR[i].d_archivo],filename)
                    $scope.fileName = file.name;
                    console.log(file);
                }
            };
            $scope.select = select;            
            ApiUser.DataCampoOpcion.list({data_campo:$scope.select}).$promise.then(function(r) {
                $scope.listDCO = r;
            }, function(err) {
                console.log("Err list contr " + err);
                toastr.error("Ocurrio un problema al listar Data Campos Opciones, intente nuevamene","Error");
            });

            $scope.listaECPR = listaECPR;
            if($scope.listaECPR){
                for(var i = 0; i < $scope.listaECPR.length; i++){
                    if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'regimen_pension'){
                        $scope.listaECPR[i].regimen_pension = $scope.listaECPR[i].data;
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'categoria_academica'){
                        $scope.listaECPR[i].categoria_academica = $scope.listaECPR[i].data;
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'cargo_ocupado'){
                        $scope.listaECPR[i].cargo_ocupado = $scope.listaECPR[i].data;
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'institucion'){
                        $scope.listaECPR[i].institucion = $scope.listaECPR[i].data;
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'idioma'){
                        $scope.listaECPR[i].idioma = $scope.listaECPR[i].data;
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'grado_academico'){
                        $scope.listaECPR[i].grado_academico = $scope.listaECPR[i].data;
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'especialidad'){
                        $scope.listaECPR[i].especialidad = $scope.listaECPR[i].data; 
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'proceso_grado_academico'){
                        $scope.listaECPR[i].proceso_grado_academico = $scope.listaECPR[i].data;
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'codigo_postal'){
                        $scope.listaECPR[i].codigo_postal = $scope.listaECPR[i].data;
                    }
                    else if($scope.listaECPR[i].elemento_campo_pred.campo_predefinido.tipo_campo == 'pais'){
                        $scope.listaECPR[i].pais = $scope.listaECPR[i].data; 
                    }
                }
            };            

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
        
        $scope.saveRegistro = function() {  //elemento_campo,persona,data             
            registros = [];
            for(var i=0; i<$scope.listaEC.length;i++){
                var formData = new FormData(); 
                if($scope.listaEC[i].d_string){                    
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_string', $scope.listaEC[i].d_string);
                    registros.push(formData);

                }                 
                else if ($scope.listaEC[i].d_texto){                    
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_texto', $scope.listaEC[i].d_texto);
                    registros.push(formData);
                }
                else if ($scope.listaEC[i].d_number){
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_number', $scope.listaEC[i].d_number);
                    registros.push(formData);
                }
                else if ($scope.listaEC[i].d_decimal){                 
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_decimal', $scope.listaEC[i].d_decimal);
                    registros.push(formData);
                }
                else if ($scope.listaEC[i].d_fecha){
                    var date =  $scope.listaEC[i].d_fecha;
                    date = date.getTime();
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_fecha', date);
                    registros.push(formData);
                }
                else if ($scope.listaEC[i].d_url){
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_url', $scope.listaEC[i].d_url);
                    registros.push(formData);
                }
                else if($scope.listaEC[i].select){                   
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_select', $scope.listaEC[i].select);
                    registros.push(formData);
                }
                else if($scope.listaEC[i].select_option){                    
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_opcion', $scope.listaEC[i].select_option);
                    registros.push(formData);

                }
                else if($scope.listaEC[i].d_imagen){                    
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_imagen', $scope.listaEC[i].d_imagen);                    
                    registros.push(formData);                
                }
                else if($scope.listaEC[i].d_archivo){                    
                    formData.append('set_elemento_campo', $scope.listaEC[i].id);
                    formData.append('persona', $scope.registro.persona);
                    formData.append('d_archivo', $scope.listaEC[i].d_archivo);
                    registros.push(formData);
                }             
            }
                        
            for (var i = 0; i < registros.length; i++){
                ApiUser.ElementoCampoRegistro.upload(registros[i]).$promise.then(function(r){
                    console.log("r: " + r);
                }, function(err) {
                    console.log("Err" + err);
                });  
            }
            //OTRO MODO DE GUARDADO FUNCIONA IGUAL
            // for (var i = 0; i < registros.length; i++){                
            //     $http.post(rleg,registros[i],{ 
            //         headers: {'Content-Type': undefined},
            //         transformRequest: angular.identity,
            //     }).then(function(r){
            //         console.log("r + " + r);
            //     },function(err){
            //         console.log("Err" + err);
            //     });
            // };  
            if($scope.listECP.length > 0){
                reg_predeter = [];
                for(var i=0; i<$scope.listECP.length;i++){
                    if($scope.listECP[i].regimen_pension){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].regimen_pension,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listECP[i].categoria_academica){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].categoria_academica,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listECP[i].cargo_ocupado){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].cargo_ocupado,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listECP[i].institucion){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].institucion,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listECP[i].idioma){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].idioma,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listECP[i].grado_academico){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].grado_academico,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listECP[i].especialidad){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].especialidad,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listECP[i].proceso_grado_academico){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].proceso_grado_academico,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listaECP[i].codigo_postal){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].codigo_postal,
                        }
                        reg_predeter.push(dic)
                    }
                    else if($scope.listECP[i].pais){
                        dic = {
                            'set_elemento_campo_pred': $scope.listECP[i].id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listECP[i].pais,
                        }
                        reg_predeter.push(dic)
                    }
                }
                ApiUser.ElementoCampoPredefinidoRegistro.save(reg_predeter).$promise.then(function(r){
                    console.log("r: " + r);
                }, function(err) {
                    console.log("Err" + err);
                }); 
            }            
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
                else if($scope.listaECR[i].d_opcion){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,
                        'persona': $scope.registro.persona,
                        'd_opcion': $scope.listaECR[i].d_opcion,
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
                    // date = date.toJSON().split("T")[0];
                    date = date.getTime();                    
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,    
                        'persona': $scope.registro.persona,
                        'd_fecha': date
                    }
                }
                else if ($scope.listaECR[i].d_url){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,     
                        'persona': $scope.registro.persona,
                        'd_url': $scope.listaECR[i].d_url,
                    }
                }
                else if($scope.listaECR[i].d_select){
                    dic = {
                        'id': $scope.listaECR[i].id,
                        'set_elemento_campo': $scope.listaECR[i].elemento_campo.id,
                        'persona': $scope.registro.persona,
                        'd_select': $scope.listaECR[i].d_select,
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

            if($scope.listaECPR){
                for(var i=0; i<$scope.listaECPR.length;i++){
                    if($scope.listaECPR[i].regimen_pension){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona,
                            'data': $scope.listaECPR[i].regimen_pension,
                        }
                    }
                    else if($scope.listaECPR[i].categoria_academica){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].categoria_academica,
                        }
                    }
                    else if ($scope.listaECPR[i].cargo_ocupado){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].cargo_ocupado,
                        } 
                    }
                    else if ($scope.listaECPR[i].institucion){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].institucion,
                        } 
                    }
                    else if ($scope.listaECPR[i].idioma){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].idioma,
                        } 
                    }
                    else if ($scope.listaECPR[i].grado_academico){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].grado_academico,
                        } 
                    }
                    else if ($scope.listaECPR[i].especialidad){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].especialidad,
                        } 
                    }
                    else if($scope.listaECPR[i].proceso_grado_academico){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].proceso_grado_academico,
                        } 
                    }
                    else if($scope.listaECPR[i].codigo_postal){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].codigo_postal,
                        }
                    }
                    else if($scope.listaECPR[i].pais){
                        dic = {
                            'id': $scope.listaECPR[i].id,
                            'set_elemento_campo_pred': $scope.listaECPR[i].elemento_campo_pred.id,
                            'persona': $scope.registro.persona, 
                            'data': $scope.listaECPR[i].pais,
                        } 
                    }
                    ApiUser.ElementoCampoPredefinidoRegistro.update({id:$scope.listaECPR[i].id},dic).$promise.then(function(r){
                        console.log("r: " + r);
                    }, function(err) {
                        console.log("Err" + err);
                    }); 
                }
            };             
            toastr.success("Se actualizó correctamente."); 
            $mdDialog.hide();            
        };

        $scope.delReg = function(listaECR,listaECPR,subitem) {
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
                      console.log('r' + r);
                  }, function(err){
                      console.log("Err" +err);
                  });    
              };
              $scope.subitem = subitem.nombre;
              $scope.listaECPR = listaECPR;
              if($scope.listaECPR){
                  reg_pred = []
                  for(var i = 0; i < $scope.listaECPR.length; i++){
                      if($scope.listaECPR[i].elemento_campo_pred.elemento.sub_item == $scope.subitem){
                          reg_pred.push($scope.listaECPR[i]);
                      }
                  }
                  $scope.listaECPR = reg_pred;
                  if($scope.listaECPR.length > 0){
                    for(var i = 0; i < $scope.listaECPR.length; i++){
                          ApiUser.ElementoCampoPredefinidoRegistro.delete({id:$scope.listaECPR[i].id}).$promise.then(function(r){
                              console.log('r' + r);
                          }, function(err){
                              console.log("Err" +err);
                          });    
                    };
                  }
              }
              $scope.listarElementCampReg(); 
              $scope.listarElementCampPredReg();
              $scope.subitem_registro();
              toastr.info('Se Eliminó Correctamente');
              console.log("Eliminado");
          }, function(){
            console.log("No se ha Eliminado");
          });
        };
	   
    }) 
