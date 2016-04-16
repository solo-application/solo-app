'use strict'

angular.module('starter')
.controller('AppCtrl', function ($scope, $location, $window) {
  $scope.logOut = function() {
    $window.localStorage.removeItem('current-user');
    $location.path('/home');
    // $location.reload();
  }
});