
var baseUrl = 'http://localhost:9001';
var authsUrl = baseUrl +'/api/auths/';
var gperfilUrl = baseUrl+'/api/gperfil/';
var clegUrl = baseUrl+'/api/cleg/';
var rlegUrl =baseUrl +'/api/rleg/';
var cgenUrl =baseUrl +'/api/cgen/';
var catUrl =baseUrl +'/api/cat/';
var userUrl = baseUrl+'/api/cleg/';
var gdataUrl = baseUrl+'/api/gdata/';
var resumenUrl = baseUrl+'/api/gperfil/';


var config = {
    
    baseUrl: baseUrl,
    authsUrl: authsUrl,
    gperfilUrl: gperfilUrl,
    clegUrl: clegUrl,
    userUrl: userUrl,
    rlegUrl: rlegUrl,
    cgenUrl: cgenUrl,
    catUrl: catUrl,
    gdataUrl: gdataUrl,
    resumenUrl: resumenUrl,

};

app

.value('config_auths', config);
