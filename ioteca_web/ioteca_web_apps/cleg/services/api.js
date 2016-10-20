app
	.factory("APII", function($resource, config_auths){
		var url = config_auths.clegUrl;
		var url1 = config_auths.rlegUrl;
		var url2 = config_auths.cgenUrl;
		var url3 = config_auths.catUrl;
		return{
			
			Item: $resource(url2 + "items/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },
            "list":{
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
	        SubItem: $resource(url2 + "subItems/:id/", { 'id': '@id' }, {
	            "update": { method: 'PUT' },
	            "list": { method: 'GET', isArray: true }
	        }),
	        Seccion: $resource(url2 + "seccions/:id/", { 'id': '@id' }, {
	            "update": { method: 'PUT' },
	            "list": { method: 'GET', isArray: true }
            }),

	        Campo: $resource(url + "campos/:id/", { 'id': '@id' }, {
	            "update": { method: 'PUT' },
	            "list": { method: 'GET', isArray: true }
            }),
            
            CampoPropiedadForm: $resource(url + "campoPropiedadForms/:id/", { 'id': '@id' }, {
	            "update": { method: 'PUT' },
	            "list": { method: 'GET', isArray: true }
	        }), 
		};
	});
