'use strict'

angular.module('starter')
.controller('TravellerCtrl', TravellerCtrl);

  function TravellerCtrl($scope, $state, $http, apiUrl, UserSession, $ionicModal, $stateParams) {
    $scope.trips   = [];
    $scope.newTrip = {};
    $scope.exec    = $stateParams.exec

    $http.get(apiUrl + '/users/' + UserSession.user.id + '/trips', {})
    .then(function(response) {
      $scope.trips = response.data.trips;
      $scope.trips.sort(function(a, b) {
        return Date.parse(a.start_date) > Date.parse(b.start_date);
      });
    }).catch(function(err) {
      console.log(err);
    });

    $scope.addCompanion = function(companion_id) {
      $scope.processing = true;
      $http.post(apiUrl + '/users/' + UserSession.user.id + '/links', { link: { companion_id: companion_id, traveller_id: UserSession.user.id } }, {})
      .then(function(response) {
        var hash     = response.data.link.companion
        hash.link_id = response.data.link.id
        $scope.processing = false;
        $scope.users = [];
        $scope.searchModal.hide();
      }).catch(function(err) {
        console.log(err);
        $scope.processing = false;
      })
    }

    $scope.showSearchModal = function() {
      $ionicModal.fromTemplateUrl("routes/traveller/search-modal.html", {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.searchModal = modal;
        $scope.searchModal.show();
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

    $scope.addTrip = function(trip) {
      $ionicModal.fromTemplateUrl("routes/traveller/add-trip.html", {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function(modal) {
        $scope.tripModal = modal;
        $scope.tripModal.show();
        if(trip) {
          $scope.newTrip      = trip;
          $scope.addTripTitle = 'Update Trip'
        } else {
          $scope.addTripTitle = 'Add a New Trip'
        }
      });
    }

    $scope.createTrip = function() {
      $http.post(apiUrl + '/users/' + UserSession.user.id + '/trips', { trip: $scope.newTrip }, {})
      .then(function(response) {
        $scope.trips.push(response.data.trip);
        $scope.tripModal.hide();
      }).catch(function(err) {
        console.log(err);
      })
    }

    $scope.removeTrip = function(trip) {
      $http.get(apiUrl + '/users/' + UserSession.user.id + '/trips/' + trip.id + '/destroy/', {})
      .then(function(response) {
        $scope.trips.splice($scope.trips.indexOf(trip), 1);
      }).catch(function(err) {
        console.log(err);
      })
    }

    $scope.hideModal = function(type) {
      if(type == 'trip') {
        $scope.tripModal.hide();
      } else if(type == 'search') {
        $scope.searchModal.hide();
      }
    }

    if($scope.exec == 'add-trip') {
      $scope.addTrip(null);
    } else if($scope.exec == 'add-companion') {
      $scope.showSearchModal();
    }
  }