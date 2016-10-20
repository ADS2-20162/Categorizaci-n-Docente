app
// gperfl routers
    .config(function($stateProvider, $urlRouterProvider){
    $stateProvider

        .state("gperfil.area", {
            url:"/area",
            data: {section:'Administrar', page:'Area'},
            templateUrl: "ioteca_web_apps/gperfil/views/area/index.html"
        })
        .state("gperfil.areaperfil", {
            url:"/areaperfil",
            data: {section:'Administrar', page:'AreaPerfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/areaperfil/index.html"
        })
        .state("gperfil.competencia", {
            url:"/competencia",
            data: {section:'Administrar', page:'Competencia'},
            templateUrl: "ioteca_web_apps/gperfil/views/competencia/index.html"
        })
        .state("gperfil.competenciaperfil", {
            url:"/competenciaperfil",
            data: {section:'Administrar', page:'CompetenciaPerfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/competenciaperfil/index.html"
        })
        .state("gperfil.dimensionperfil", {
            url:"/dimensionperfil",
            data: {section:'Administrar', page:'DimensionPerfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/dimensionperfil/index.html"
        })
        .state("gperfil.dimension", {
            url:"/dimension",
            data: {section:'Administrar', page:'Dimension'},
            templateUrl: "ioteca_web_apps/gperfil/views/dimension/index.html"
        })
        .state("gperfil.escala", {
            url:"/escala",
            data: {section:'Administrar', page:'Escala'},
            templateUrl: "ioteca_web_apps/gperfil/views/escala/index.html"
        })
        .state("gperfil.escaladimension", {
            url:"/escaladimesion",
            data: {section:'Administrar', page:'EscalaDimension'},
            templateUrl: "ioteca_web_apps/gperfil/views/escaladimension/index.html"
        })
        .state("gperfil.perfil", {
            url: "/perfil",
            data: {section: 'Configurar', page: 'Perfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/perfil/index.html"
        })
        .state("gperfil.subareaperfil", {
            url:"/subareaperfil",
            data: {section:'Administrar', page:'SubareaPerfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/subareaperfil/index.html"
        })
        .state("gperfil.subarea", {
            url:"/subarea",
            data: {section:'Administrar', page:'Subarea'},
            templateUrl: "ioteca_web_apps/gperfil/views/subarea/index.html"
        })

        .state("gperfil.listaperfil", {
            url: "/perfil/lista",
            data: {section: 'Administrar', page: 'Perfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/perfil/lista.html"
        })
        .state("gperfil.confareaperfil", {
            url: "/perfil/areaperfil/:perfil_id",
            data: {section: 'Cofigurar', page: 'AreaPerfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/areaperfil/conf_areaperfil.html",
        })
        .state("gperfil.confsubareaperfil", {
            url: "/perfil/subareaperfil/:sap_id",
            data: {section: 'Configurar', page: 'SubareaPerfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/subareaperfil/conf_subareaperfil.html",
        })
        .state("gperfil.confcompetperfil", {
            url: "/subareaperfil/:sap_id/conf",
            data: {section: 'Configurar', page: 'SubareaPerfil'},
            templateUrl: "ioteca_web_apps/gperfil/views/competenciaperfil/confcperfil.html",
        })
        .state("gperfil.confescaladim", {
            url: "/escaladimesion/:dp_id/conf",
            data: {section: 'Configurar', page: 'EscalaDimension'},
            templateUrl: "ioteca_web_apps/gperfil/views/escaladimension/configurar.html",
        });
    });
