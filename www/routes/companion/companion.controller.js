'use strict'

angular.module('starter')
.controller('CompanionCtrl', CompanionCtrl);

  function CompanionCtrl($scope, $state, $http, apiUrl, UserSession, $ionicModal, $cordovaGeolocation, $ionicPopup) {
    $scope.travellers = [];
    $scope.users      = [];
    $http.get(apiUrl + '/users/' + UserSession.user.id + '/links', {})
    .then(function(response) {
      console.log(response)
      response.data.links.forEach(function(link) {
        $scope.travellers.push(link.companion);
      });
    }).catch(function(err) {
      console.log(err);
    });

    $scope.showSearchModal = function() {
      $ionicModal.fromTemplateUrl("routes/companion/search-modal.html", {
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

    $scope.addCompanion = function(companion_id) {
      $scope.processing = true;
      $http.post(apiUrl + '/users/' + UserSession.user.id + '/links', { link: { companion_id: companion_id, traveller_id: UserSession.user.id } }, {})
      .then(function(response) {
        $scope.travellers.push(response.data.link.companion)
        $scope.processing = false;
        $scope.searchModal.hide();
      }).catch(function(err) {
        console.log(err);
      })
    }

    $scope.viewTraveller = function(traveller) {
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
      } else if(keyword == 'search') {
        $scope.searchModal.hide();
      }
    };
  }