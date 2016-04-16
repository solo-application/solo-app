'use strict'

angular.module('starter')
.controller('DashboardCtrl', DashboardCtrl);

  function DashboardCtrl($scope, UserSession, $state) {
    UserSession.reload();
    if(!UserSession.user) $state.go('app.login');
  }
