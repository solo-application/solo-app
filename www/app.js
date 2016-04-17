angular.module('starter', [
  'ionic',
  'ngResource',
  'ui.router',
  'ngCordova'
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
.config(function($stateProvider, $urlRouterProvider) {
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
    })
    .state('app.dashboard', {
      url: '^/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'routes/dashboard/dashboard.html',
          controller: 'DashboardCtrl'
        }
      }
    })
    .state('app.companion', {
      url: '^/companion/:type',
      views: {
        'menuContent': {
          templateUrl: 'routes/companion/companion.html',
          controller: 'CompanionCtrl'
        }
      }
    })
    .state('app.traveller', {
      url: '^/traveller/:exec',
      views: {
        'menuContent': {
          templateUrl: 'routes/traveller/traveller.html',
          controller: 'TravellerCtrl'
        }
      }
    })
    .state('app.profile', {
      url: '^/profile',
      views: {
        'menuContent': {
          templateUrl: 'routes/profile/profile.html',
          controller: 'ProfileCtrl'
        }
      }
    });

  $urlRouterProvider.otherwise('/home');
})
.constant('apiUrl', 'https://solo-api-production.herokuapp.com/v1') // 'https://solo-api-production.herokuapp.com/v1' || 'http://localhost:3000/v1'
.service('UserSession', function($window) {
  this.user = null;
  this.reload = function() {
    try {
      this.user = JSON.parse($window.localStorage.getItem('current-user'));
    } catch(e) {
      this.user = null;
    }
  }
  this.reload();
});
