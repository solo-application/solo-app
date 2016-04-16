'use strict'

angular.module('starter')
.controller('LogInCtrl', LogInCtrl);

  function LogInCtrl($scope, $state, $window, $ionicPopup, $http, apiUrl, UserSession) {
    $scope.user = {};

    $scope.logIn = function() {
      $http.get(apiUrl + '/users/current_user', { params: { username: $scope.user.username, password: $scope.user.password } })
      .then(function(response) {
        $window.localStorage.setItem('current-user', JSON.stringify(response.data.user));
        $scope.user = {};
        $state.go('app.dashboard');
      }).catch(function(err) {
        console.log(err);
        $ionicPopup.alert({
          title: 'Could not login',
          template: 'Please try again'
        });
      });
    }
  }
