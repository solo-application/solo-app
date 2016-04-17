'use strict'

angular.module('starter')
.controller('CompanionCtrl', CompanionCtrl);

  function CompanionCtrl($scope, $state, $http, apiUrl, UserSession, $ionicModal, $cordovaGeolocation, $ionicPopup, $stateParams) {
    $scope.travellers = [];
    $scope.users      = [];
    $scope.type       = $stateParams.type
    if(!$scope.type) { $state.go('app.companion', {type: 'current'}); }
    $http.get(apiUrl + '/users/' + UserSession.user.id + '/links', { params: { type: $scope.type } })
    .then(function(response) {
      console.log(response)
      response.data.links.forEach(function(link) {
        var hash     = link.traveller
        hash.link_id = link.id
        $scope.travellers.push(hash);
      });
    }).catch(function(err) {
      console.log(err);
    });

    $scope.acceptTraveller = function(traveller) {
      $scope.processing = true;
      $http.put(apiUrl + '/users/' + UserSession.user.id + '/links/' + traveller.link_id, { link: { match_confirmed: true } }, {})
      .then(function(response) {
        $scope.travellers.splice($scope.travellers.indexOf(traveller), 1);
        $scope.processing = false;
      }).catch(function(err) {
        console.log(err);
        $scope.processing = false;
      })
    }

    $scope.denyTraveller = function(traveller) {
      $scope.processing = true;
      $http.get(apiUrl + '/users/' + UserSession.user.id + '/links/' + traveller.link_id + '/destroy', {})
      .then(function(response) {
        $scope.travellers.splice($scope.travellers.indexOf(traveller), 1);
        $scope.processing = false;
      }).catch(function(err) {
        console.log(err);
        $scope.processing = false;
      })
    }

    $scope.viewTraveller = function(traveller) {
      if($scope.type == 'pending') { return true; }
      $http.get(apiUrl + '/users/' + traveller.id + '/trips', { params: { current_only: true } })
      .then(function(response) {
        console.log(response);
        $ionicModal.fromTemplateUrl("routes/companion/view-traveller.html", {
          scope: $scope,
          animation: 'slide-in-up'
        }).then(function(modal) {
          $scope.selectedTraveller = traveller;
          $scope.trip              = response.data.trips[0]
          if($scope.trip) {
            $scope.travellerModal = modal;
            $scope.travellerModal.show();
            $cordovaGeolocation.getCurrentPosition({timeout: 10000, enableHighAccuracy: true}).then(function(position){
              var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
              };
              $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
              google.maps.event.addListenerOnce($scope.map, 'idle', function(){
                var marker = new google.maps.Marker({
                  map: $scope.map,
                  animation: google.maps.Animation.DROP,
                  position: latLng
                });      
              });
            }, function(error){
              console.log("Could not get location");
            });
          } else {
            $ionicPopup.alert({
              title: 'No current trips'
            });
          }
        });
      }).catch(function(err) {
        console.log(err);
      })
    }

    $scope.hideModal = function(keyword) {
      if(keyword == 'traveller') {
        $scope.travellerModal.hide();
      }
    };
  }