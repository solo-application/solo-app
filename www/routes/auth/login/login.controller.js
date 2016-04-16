'use strict'

angular.module('starter')
.controller('LogInCtrl', LogInCtrl);

  function LogInCtrl($scope, $auth) {
    $scope.user = {};

    $scope.logIn = function() {
      $auth.submitLogin($scope.loginData).then(function(resp){
        console.log(resp);

        $window.localStorage.setItem('current-user', JSON.stringify(resp));
        validateUser();

        $state.go('app.forms');
        $scope.loginData = {};

      }).catch(function(resp){
        console.log(resp);
        $ionicPopup.alert({
          title: 'Could not login',
          template: 'Please try again'
        });
      });
    };
  }