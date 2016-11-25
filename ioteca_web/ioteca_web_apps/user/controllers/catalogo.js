app
	.controller('CatalogoCtrl', function($scope, ApiUser, $window, $stateParams, $mdDialog, toastr, $timeout, upload){
		// var params = {};
		var url = 'ioteca_web_apps/user/views/catalogo';
		$scope.lista = [];
		$scope.adj = {};
		$scope.listaD = [];
		$scope.listDim = [];
		$scope.perfil = {};

		(function (){
	        ApiUser.Perfil.list().$promise.then(function(r){
					$scope.lista = r;
	            }, function(err) {
	                console.log("Error al listar persona " + err);
	        });
	   //      ApiUser.Dimension.list().$promise.then(function(r){
				// $scope.listDim = r;
	   //      });
	    })();

	    $scope.cancel = function(){
			$mdDialog.cancel();
			$scope.fromVisibility = false;
	        $scope.btn1Visibility = true;
	        $scope.btnVisibility = true;
		};

		$scope.validar = function(e, c){
			ApiUser.Registro.list({'compet': c, 'esc':e}).$promise.then(function(r){
				
				// if ($scope.listRe.length<1) {
				// 	toastr.error('NO Existe');
				// 	return false;
				// } else {
				// 	toastr.error('Existe');
				// 	return true;
				// }
				// for (var i = 0; i < $scope.listRe.length; i++) {
				// 	$scope.newE = $scope.listRe[i].escaladimension;
				// 	$scope.newC = $scope.listRe[i].competenciaperfil;
					
				// 	if (e==$scope.newE & c==$scope.newC) {
				// 		toastr.error('Existe');
				// 	}
				// }
				$scope.ptj=(r[0].escdim_puntaje*r[0].estado_data)*r[0].comperfil_puntaje/100;
				
			});
		};

	    //===================================================
	    //Listar Areas por Perfil
	    //===================================================
	    $scope.loadAreas = function(d) {
	    	$scope.perfil=d;
		    ApiUser.AreaPerfil.list({'perfil':$scope.perfil}).$promise.then(function(r){
					$scope.listaA = r;
		    });
		  //   ApiUser.Dimension.list({'perfilid':$scope.idperfil}).$promise.then(function(r){
				// $scope.listDim = r;
	   //      });
		};

		//===================================================
		//Listar Sub areas
		//===================================================
		$scope.loadSubarea = function(e){
			$scope.aperfil = e;	
		    ApiUser.Dimension.list({'dimension':$scope.aperfil}).$promise.then(function(r){
				$scope.listaDim = r;
		    });
		    ApiUser.CompetenciaPerfil.list({'competencia':$scope.aperfil}).$promise.then(function(r){
				$scope.listaC = r;
		    });
		};

		//====================================================
		//change para guardar
		//====================================================
		$scope.changeSave = function(escaladimension, competenciaperfil){
	    	var estado_data = 1;
	   		$scope.registro = {};
            $scope.registro = {'estado_data': estado_data, 'escaladimension': escaladimension, 'competenciaperfil': competenciaperfil};
                ApiUser.Registro.save($scope.registro).$promise.then(function(r) {
                toastr.success('Se agrego correctamente');
            }, function(err) {
                console.log("Err " + err);
            });
		};


		//=====================================================
		//para ver lista de adjuntos
		//=====================================================
		$scope.adjuntar = function(e, c){
			$scope.esc = e;
			$scope.compt = c;
			console.log("======escala>>> " +e);
			console.log("======compete>>> " +c);
			$mdDialog.show({
	            scope: $scope,
	            templateUrl: url +'/adjuntos.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	        });

        	ApiUser.Observacion.list({'competencia': $scope.compt, 'escala':$scope.esc}).$promise.then(function(r){
	        	$scope.listaObs = r;
	        });
		};

		//==================================================
	    //para mostra y ocultar btns
	    //==================================================
	    $scope.fromVisibility = false;
	    $scope.btnVisibility = true;
	    $scope.btn1Visibility = true;
	    $scope.inputVisibility = true;

	    $scope.showForm = function(){
            $scope.categoriaEje = {};
            $scope.fromVisibility = true;
            $scope.btnVisibility = false;
            $scope.btn1Visibility = false;  
            $scope.inputVisibility = true; 	
            $scope.chooseVisibility = true;        
	    };

	    //=================================================
	    //Editar los Adjuntos
	    //=================================================
	    $scope.editarAdj = function(d){
	    	$scope.adj = d;
	    	$scope.categoriaEje = {};
            $scope.fromVisibility = true;
            $scope.btnVisibility = false;
            $scope.btn1Visibility = false;  
            $scope.inputVisibility = true; 
            $scope.chooseVisibility = false;
	    };

	    //===================================================
	    //Ocultar el Formulario
	    //===================================================
	    $scope.closeForm = function(){
	        $scope.fromVisibility = false;
	        $scope.btn1Visibility = true;
	        $scope.btnVisibility = true;
	    };

	    //==================================================
	    //para guradar los documentos adjuntos
	    //==================================================
	    $scope.saveAdj = function(){
	    	
	    	ApiUser.Adjunto.update({ id: $scope.adj.id }, $scope.adj).$promise.then(function(r) {
                toastr.success('Se actualizó correctamente');
            });

	    	$scope.fromVisibility = false;
	        $scope.btn1Visibility = true;
	        $scope.btnVisibility = true;
	    };

	    //===================================================
	    //listar los documentos adjuntos
	    //===================================================
	    listarDoc = function(){
	    	ApiUser.Adjunto.list().$promise.then(function(r){
	    		$scope.listaDoc = r;
	    	}, function(err){
	    		toastr.error('error Listar Doc');
	    	});
	    };
	    listarDoc();

	    //===================================================
	    //para cargar el archivos adjunto
	    //===================================================
	    $scope.uploadFile = function(){
	        var name = $scope.nombre;
	        var file = $scope.file;
	        var description = $scope.descripcion;
	        var priorizar = $scope.priorizar;
	        upload.uploadFile(name, file, description, priorizar).then(function(r){   
	            document.getElementById("myForm").reset();
	            toastr.success("Se Guardó correctamente!");
	            listarDoc();
	        });
	    };

	    //====================================================
	    //eliminar los documentos adjuntos
	    //====================================================
	    $scope.deleteAdj = function(d){
	    	ApiUser.Adjunto.delete({ id: d.id }).$promise.then(function(r) {
                toastr.info('El Documento se elimino correctamente');
                listarDoc();
            }, function(err) {
            });
	    };

	    //=====================================================
	    //Guardar las observaciones de cada archivos
	    //=====================================================
	    $scope.saveObs = function(d){
	    	console.log('las observaciones ' +d);
	    	ApiUser.Observacion.save().$promise.then(function(r){
	    		toastr.success('Se Envio Correctamente');
	    	});
	    };

	    var imagePath = 'media/img/list/anonymous.png';
	    $scope.todos = [
	      {
	        face : imagePath,
	        what: 'Roger Paucar Uscamaita?',
	        who: 'Usuario',
	        when: '3:08PM',
	        notes: " I'll be in your neighborhood doing errands"
	      },
	      {
	        face : imagePath,
	        what: 'Wilson Cruz?',
	        who: 'Administrador',
	        when: '3:08PM',
	        notes: " I'll be in your neighborhood doing errands"
	      }
	    ];
	})

.directive('uploaderModel', ["$parse", function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, iElement, iAttrs) 
        {
            iElement.on("change", function(e)
            {
                $parse(iAttrs.uploaderModel).assign(scope, iElement[0].files[0]);
            });
        }
    };
}])


.service('upload', ["$http", "$q", function ($http, $q) 
{
    this.uploadFile = function(name, file, description, priorizar)
    {
        var archivosUrl = "http://localhost:9001/api/gdata/adjuntos/";
        var deferred = $q.defer();
        var formata = new FormData();
        formData.append("nombre", name);
        formData.append("url", file);
        formData.append("descripcion", description);
        formData.append("priorizar", priorizar);
        return $http.post(archivosUrl, formData, {
            headers: {
                "Content-type": undefined
            },
            transformRequest: angular.identity
        })
        .success(function(res)
        {
            deferred.resolve(res);
        })
        .error(function(msg, code)
        {
            deferred.reject(msg);
        })
        return deferred.promise;
    };   
}]);
