'use strict'

angular.module('starter')
.controller('DashboardCtrl', DashboardCtrl);

  function DashboardCtrl($scope, UserSession) {
    UserSession.reload();
    $scope.currentUser = UserSession.user;
  }
