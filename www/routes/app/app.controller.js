'use strict'

angular.module('starter')
.controller('AppCtrl', function ($scope, $state, $window) {
  $scope.logOut = function() {
    $window.localStorage.removeItem('current-user');
    $location.path('/home');
  }
});