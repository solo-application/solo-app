'use strict'

angular.module('starter')
.controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($timeout, $state) {
    $timeout(function() {
      $state.go('app.login')
    }, 3000);
  }