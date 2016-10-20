app

   .factory("API", function($resource, config_auths) {
   var url = config_auths.gperfilUrl;
   var urlmof = config.gmofUrl;
    return {
        Perfil: $resource(url + "perfiles/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results: angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options:{"count":1,"pages":1,"page":1,"per":1,"range":"all",
                    "previous":null,"page_size":1,"next":null};


                    return { results: results, options: options };
                }
            },
            "options": {
                method: 'OPTIONS',
                isArray: false,
                transformResponse: function(r) {
                    return angular.fromJson(r).actions.POST;
                }
            }
        }),
        Area: $resource(url + "areas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            //"list": { method: 'GET', isArray: false, params: { query: '@query', page: '@page', page_size: '@page_size' } }
            "list": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results: angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options:{"count":1,"pages":1,"page":1,"per":1,"range":"all",
                    "previous":null,"page_size":1,"next":null};


                    return { results: results, options: options };
                }
            },
            "options": {
                method: 'OPTIONS',
                isArray: false,
                transformResponse: function(r) {
                    return angular.fromJson(r).actions.POST;
                }
            }
        }),
        AreaPerfil: $resource(url + "areaperfiles/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }
        }),
        Subarea: $resource(url + "subareas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results: angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options:{"count":1,"pages":1,"page":1,"per":1,"range":"all",
                    "previous":null,"page_size":1,"next":null};


                    return { results: results, options: options };
                }
            },
            "options": {
                method: 'OPTIONS',
                isArray: false,
                transformResponse: function(r) {
                    return angular.fromJson(r).actions.POST;
                }
            }
        }),
        SubareaPerfil: $resource(url + "subareaperfiles/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }
        }),
        CompetenciaPerfil: $resource(url + "competenciaperfiles/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }
        }),
        Competencia: $resource(url + "competencias/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results: angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options:{"count":1,"pages":1,"page":1,"per":1,"range":"all",
                    "previous":null,"page_size":1,"next":null};

                    return { results: results, options: options };
                }
            },
            "options": {
                method: 'OPTIONS',
                isArray: false,
                transformResponse: function(r) {
                    return angular.fromJson(r).actions.POST;
                }
            }
        }),
        EscalaDimension: $resource(url + "escaladimensiones/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true, params: { query: '@query' } }
        }),
        Dimension: $resource(url + "dimensiones/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": 
            {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results: angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options:{"count":1,"pages":1,"page":1,"per":1,"range":"all",
                    "previous":null,"page_size":1,"next":null};
                    return { results: results, options: options };
                }
            },
            "options": {
                method: 'OPTIONS',
                isArray: false,
                transformResponse: function(r) {
                    return angular.fromJson(r).actions.POST;
                }
            }
        }),
        Escala: $resource(url + "escalas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results: angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options:{"count":1,"pages":1,"page":1,"per":1,"range":"all",
                    "previous":null,"page_size":1,"next":null};
                    return { results: results, options: options };
                }
            },
            "options": {
                method: 'OPTIONS',
                isArray: false,
                transformResponse: function(r) {
                    return angular.fromJson(r).actions.POST;
                }
            }
        }),
        DimensionPerfil: $resource(url + "dimensionperfiles/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }
        }),        
// //////////////////////////////////////
// /////////////////GMOF/////////////////
// //////////////////////////////////////
        Cargo: $resource(urlmof + "cargos/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results: angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options:{"count":1,"pages":1,"page":1,"per":1,"range":"all",
                    "previous":null,"page_size":1,"next":null};

                    return { results: results, options: options };
                }
            },
            "options": {
                method: 'OPTIONS',
                isArray: false,
                transformResponse: function(r) {
                    return angular.fromJson(r).actions.POST;
                }
            }
        }),
        Funcion: $resource(urlmof + "funciones/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }
        }),
        AreaInst: $resource(urlmof + "areas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }
        }),
        SubareaInst: $resource(urlmof + "subareas/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list": { method: 'GET', isArray: true }
        }),
// /////////////////end GMOF/////////////////
    };
});
