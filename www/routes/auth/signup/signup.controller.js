'use strict'

angular.module('starter')
.controller('SignUpCtrl', SignUpCtrl);

  function SignUpCtrl($scope, $auth) {
    $scope.newUser = {};
  }