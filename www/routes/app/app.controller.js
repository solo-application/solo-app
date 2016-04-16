'use strict'

angular.module('starter')
.controller('AppCtrl', function ($scope, $state) {
  $scope.logOut = function() {
    $window.localStorage.removeItem('current-user');
    $state.go('app.home');
  }
});