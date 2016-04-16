angular.module('starter', [
  'ionic',
  'ngResource',
  'ui.router',
  'ng-token-auth'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider, $authProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'routes/app/app.html',
      controller: 'AppCtrl'
    })
    .state('app.home', {
      url: '^/home',
      views: {
        'menuContent': {
          templateUrl: 'routes/home/home.html',
          controller: 'HomeCtrl'
        }
      }
    })
    .state('app.login', {
      url: '^/login',
      views: {
        'menuContent': {
          templateUrl: 'routes/auth/login/login.html',
          controller: 'LogInCtrl'
        }
      }
    })
    .state('app.signup', {
      url: '^/signup',
      views: {
        'menuContent': {
          templateUrl: 'routes/auth/signup/signup.html',
          controller: 'SignUpCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/home');

  $authProvider.configure({
    apiUrl: 'https://formidableforms.herokuapp.com'
  });
})
.constant('apiUrl', 'http://localhost:3000/v1');
