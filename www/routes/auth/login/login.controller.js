'use strict'

angular.module('starter')
.controller('LogInCtrl', LogInCtrl);

  function LogInCtrl($scope, $window, $ionicPopup, $http, apiUrl, UserSession) {
    $scope.user = {};

    $scope.logIn = function() {
      $http.get(apiUrl + '/users/current_user', { user: $scope.user }, {}).then(function(response) {
        $window.localStorage.setItem('current-user', JSON.stringify(response.user));
        UserSession.reload();
        $state.go('app.dashboard');
      }).catch(function(err) {
        console.log(err);
        $ionicPopup.alert({
          title: 'Could not login',
          template: 'Please try again'
        });
      });
    }

    if(UserSession.user) {
      $http.get(apiUrl + '/users/' + UserSession.user.id, {}).then(function(response) {
        $state.go('app.dashboard');
      }).catch(function(err) {
        $window.localStorage.removeItem('current-user');
      });
    }
  }