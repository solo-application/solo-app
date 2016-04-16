'use strict'

angular.module('starter')
.controller('CompanionCtrl', CompanionCtrl);

  function CompanionCtrl($scope, $state, $http, apiUrl, UserSession, $ionicModal) {
    $scope.companions = [];
    $scope.users      = [];
    $http.get(apiUrl + '/users/' + UserSession.user.id + '/links', {})
    .then(function(response) {
      console.log(response.data);
      response.data.links.forEach(function(link) {
        $scope.companions.push(link.companion);
      });
    }).catch(function(err) {
      console.log(err);
    });

    $scope.showSearchModal = function() {
      $ionicModal.fromTemplateUrl("routes/companion/search-modal.html", {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.signatureModal = modal;
        $scope.signatureModal.show();
      });
    };

    $scope.searchUsers = function(keyword) {
      $http.get(apiUrl + '/users/' + UserSession.user.id + '/search', { params: { keyword: keyword } })
      .then(function(response) {
        $scope.users = response.data.users;
      }).catch(function(err) {
        console.log(err);
        $scope.users = [];
      })
    }

    $scope.addCompanion = function(companion_id) {
      $scope.processing = true;
      $http.post(apiUrl + '/users/' + UserSession.user.id + '/links', { link: { companion_id: companion_id, traveller_id: UserSession.user.id } }, {})
      .then(function(response) {
        console.log(response);
        $scope.companions.push(response.data.link.companion)
        $scope.processing = false;
        $scope.signatureModal.hide();
      }).catch(function(err) {
        console.log(err);
      })
    }

    $scope.hideSearchModal = function() {
      $scope.signatureModal.hide();
    };
  }