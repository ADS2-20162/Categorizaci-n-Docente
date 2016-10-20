app

    .config(function($stateProvider, $urlRouterProvider){
    $stateProvider

        .state("gperfil.item", {
            url:"/item",
            data: {section:'cleg', page:'Item'},
            templateUrl: "ioteca_web_apps/cleg/views/item/index.html"
        })

        .state("gperfil.subitem", {
            url:"/subitem",
            data: {section:'cleg', page:'Subitem'},
            templateUrl: "ioteca_web_apps/cleg/views/subitem/index.html"
        })
        
        .state("gperfil.seccion", {
            url:"/seccion",
            data: {section:'cleg', page:'Seccion'},
            templateUrl: "ioteca_web_apps/cleg/views/seccion/index.html"
        })
        
        .state("gperfil.elemento", {
            url:"/elemento",
            data: {section:'cleg', page:'Elemento'},
            templateUrl: "ioteca_web_apps/cleg/views/elemento/index.html"
        })

        .state("gperfil.legajo", {
            url:"/legajo",
            data: {section:'Configurar', page:'Legajo'},
            templateUrl: "ioteca_web_apps/cleg/views/item/conf.html"
        });
     
    });
