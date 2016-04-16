'use strict'

angular.module('starter')
.controller('DashboardCtrl', DashboardCtrl);

  function DashboardCtrl($scope, UserSession) {
    $scope.currentUser = UserSession.user
    console.log($scope.currentUser);
  }