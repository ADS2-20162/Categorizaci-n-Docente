app
// gperfl routers
    .config(function($stateProvider, $urlRouterProvider){
    $stateProvider

        .state("gperfil.resumen", {
            url:"/resumen",
            data: {section:'Reportes', page:'Resumen'},
            templateUrl: "ioteca_web_apps/reporte/views/resumen/index.html"
        })
        .state("gperfil.statistic", {
            url:"/statistic",
            data: {section:'Reportes', page:'Estadistica'},
            templateUrl: "ioteca_web_apps/gperfil/views/reporte/index.html"
        });
    });
