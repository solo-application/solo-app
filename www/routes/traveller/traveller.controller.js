'use strict'

angular.module('starter')
.controller('TravellerCtrl', TravellerCtrl);

  function TravellerCtrl($scope, $state, $http, apiUrl, UserSession, $ionicModal) {
    $scope.trips   = [];
    $scope.newTrip = {};

    $http.get(apiUrl + '/users/' + UserSession.user.id + '/trips', {})
    .then(function(response) {
      $scope.trips = response.data.trips;
      $scope.trips.sort(function(a, b) {
        return Date.parse(a.start_date) > Date.parse(b.start_date);
      });
    }).catch(function(err) {
      console.log(err);
    });

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
      }
    }
  }