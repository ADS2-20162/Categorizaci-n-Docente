app

    .config(function($stateProvider, $urlRouterProvider){
    $stateProvider

        .state("appUser.inicio", {
            url:"/inicio",
            data: {section:'User', page:'Inicio'},
            templateUrl: "ioteca_web_apps/user/views/home/index.html"
        })

        .state("appUser.cuenta", {
            url:"/cuenta",
            data: {section:'User', page:'Cuenta'},
            templateUrl: "ioteca_web_apps/user/views/persona/index.html"
        })
        
        .state("appUser.perfil", {
            url:"/legajo",
            data: {section:'User', page:'Legajo'},
            templateUrl: "ioteca_web_apps/user/views/legajo/index.html"
        })
        
        .state("appUser.miperfil", {
            url:"/datos",
            // data: {section:'User', page:'DatosPers'},
            templateUrl: "ioteca_web_apps/user/views/persona/dato.html"
        })

        .state("appUser.seguridad", {
            url:"/seguridad",
            // data: {section:'User', page:'Seguridad'},
            templateUrl: "ioteca_web_apps/user/views/password/index.html"
        })
        .state("appUser.catalogo", {
            url:"/inf catalogo",
            templateUrl: "ioteca_web_apps/user/views/catalogo/index.html"
        });
     
    });
