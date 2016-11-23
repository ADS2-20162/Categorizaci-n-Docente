app

	.controller("PersonaCtrl", function($scope, ApiUser, $window, $stateParams, $mdDialog, toastr, $parse, $http,$rootScope,$location){
		var params = {};
		var url = 'ioteca_web_apps/user/views';
		$scope.lista = [];
		$scope.listaE = [];
        $scope.listaU = []; //Lista de Usuarios
        $scope.listaPhotos = []; //Lista de Fotos de Usuarios
		$scope.persona = {};
		function list(params){
            ApiUser.Persona.list(params).$promise.then(function(r){
                $scope.lista = r.results;
            }, function(err){
                console.log("Err" +err);
            });
		}
		list(params);
		function listarEst(){
			ApiUser.EstadoCivil.list().$promise.then(function(r){
				$scope.listaE = r.results;
			}, function(err){
				console.log("Err" +err);
			});
		}
		listarEst();

		function listarNacion(){
			ApiUser.Nacionalidad.list().$promise.then(function(r){
				$scope.listaN = r.results;
			}, function(err){
				console.log("Err" +err);
			});
		}
		listarNacion();

        function listarUsuarios(){
            ApiUser.User.list().$promise.then(function(r){
                $scope.listaU = r.results;
            }, function(err){
                console.log("Err" + err);
            });
        }
        listarUsuarios();

        function listarPhotoUsers(){
            ApiUser.PhotoUser.list().$promise.then(function(r){
                $scope.listaPhotos = r.results;
            }, function(err){
                console.log("Err" + err);
            });
        }
        listarPhotoUsers();
		// mdDialog
	    $scope.cancel = function() {
	        $mdDialog.cancel();
	        list(params);
            listarPhotoUsers();
	    };
		// end mdDialog
	    $scope.sel = function(d) {
	        $scope.persona = d;
            // var fecha = $scope.persona.fecha_nac;
            // var fecha = fecha.split("-");
            // var fecha = fecha.join("/");
            // $scope.persona.fecha_nac = fecha;
            // $scope.persona.fecha_nac = new Date($scope.persona.fecha_nac);
	        $mdDialog.show({
	            scope: $scope,
	            templateUrl: url +'/persona/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	            $scope.persona = {};
	        }, function() {});
	    };

 	    $scope.uploadImage = function(d) {
            $scope.form = d;
	        $mdDialog.show({
	            scope: $scope,
	            templateUrl: url +'/persona/upload-perfil.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() { 
                listarPhotoUsers();
	        }, function() {});
	    }; 

	    $scope.save = function() {
	        if ($scope.persona.id) {
	            ApiUser.Persona.update({ id: $scope.persona.id }, $scope.persona).$promise.then(function(r) {
	                toastr.success('Se Actualizo correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	                toastr.error('No Se Actualizo');
	            });
	        } else {
	            ApiUser.Persona.save($scope.persona).$promise.then(function(r) {
	                toastr.success('Se agrego correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	            }); 
	        }
	    };
        
        $scope.saveupload = function(photo,user) {
	        if ($scope.form.id) {
	            ApiUser.PhotoUser.update({ id: $scope.form.id }, $scope.form).$promise.then(function(r) {
	                toastr.success('Se Actualizó correctamente');
                    $window.location.reload(false);
	                $mdDialog.hide();
	            }, function(err) {
	                toastr.error('No Se Actualizo');
	            });
	        } else {
	            ApiUser.PhotoUser.save($scope.form).$promise.then(function(r) {
	                toastr.success('Se agrego correctamente');
	                $mdDialog.hide();
	            }, function(err) {
	            }); 
	        }
	    }; 
	    // end mdDialog Change Password
	    $scope.chanPass = function(d) {
	        $scope.persona = d.username;
            $scope.person = $scope.persona.toUpperCase()
	        $mdDialog.show({
	            scope: $scope,
	            templateUrl: url +'/password/formd.html',
	            parent: angular.element(document.body),
	            clickOutsideToClose: false,
	            preserveScope: true,
	        }).then(function() {
	            list(params);
	            $scope.persona = {};
	        }, function() {});
	    };

	    // $scope.upload = function(){
	    // 	$http.post($scope.form, {
	    // 		headers:{'Content-Type':'multipart/form-data'}
	    // 	})
	    // 	.success(function(d){
	    // 		console.log(d);
	    // 	});
	    // };
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

.directive('chooseFile', function() {
    return {
      link: function (scope, elem, attrs) {
        var button = elem.find('button');
        var input = angular.element(elem[0].querySelector('input#fileInput'));
        button.bind('click', function() {
          input[0].click();
        });
        input.bind('change', function(e) {
          scope.$apply(function() {
            var files = e.target.files;
            if (files[0]) {
              scope.fileName = files[0].name;
            } else {
              scope.fileName = null;
            }
          });
        });
      }
    };
  });


