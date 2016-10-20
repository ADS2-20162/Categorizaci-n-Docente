var baseUrl = 'http://localhost:9001/';
var loginUrl = 'http://localhost:9000/auth_web/';
var iotecaUrl = 'http://localhost:9000/ioteca_web/';


var client_id = '7vgaBnPPCZkjjyk4bgn1KGnusjxjEpFYJz2QhpCU';
var client_secret = 'zHHelI76OwYr0wzP6nEpzT1TI9gIIA6bPFI8TvseulWMEemFMHJDtp1HxvKcZ409XT3lNBbRhXhaKmbSZjhN7jwQpZBSHVECsYiDNhQ3xnfbEzGGXyvsTR7zEeBYTMdX';
var grant_type = 'password';

var config = {

    baseUrl: baseUrl,
    loginUrl: loginUrl,
    iotecaUrl: iotecaUrl,

    client_id: client_id,
    client_secret: client_secret,
    grant_type: grant_type,

};

app.value('config', config);

app
    .run(function($rootScope, $state, $stateParams, $window, loginService) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        /*******************************agregado**************************/
        console.log("run");

        if (loginService.authentication.isAuth === false) {
            $window.location = loginUrl;
        }
        /******************************************************************/

    })

.config(function($httpProvider) {
    $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
    //$httpProvider.interceptors.push('authInterceptorService');
})

.config(function($resourceProvider) {
    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;
});
