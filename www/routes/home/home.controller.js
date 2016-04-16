'use strict'

angular.module('starter')
.controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($scope, UserSession) {
    $scope.user = UserSession.user
  }