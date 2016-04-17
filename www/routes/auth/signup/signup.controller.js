'use strict'

angular.module('starter')
.controller('SignUpCtrl', SignUpCtrl);

  function SignUpCtrl($scope, $http, apiUrl, $ionicPopup, $state, UserSession, $window) {
    $scope.newUser = {};

    $scope.signUp = function() {
      $http.post(apiUrl + '/users', { user: $scope.newUser }, {}).then(function(response) {
        console.log(response)
        $window.localStorage.removeItem('current-user');
        $window.localStorage.setItem('current-user', JSON.stringify(response.data.user));
        UserSession.reload();
        $scope.user = {};
        $state.go('app.dashboard');
      }).catch(function(err) {
        console.log(err);
        $ionicPopup.alert({
          title: 'Could not Sign Up',
          template: 'Please try again'
        });
      });
    }
  }
