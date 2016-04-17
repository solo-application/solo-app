'use strict'

angular.module('starter')
.controller('ProfileCtrl', ProfileCtrl);

  function ProfileCtrl($scope, $http, apiUrl, UserSession, $ionicPopup) {
    UserSession.reload();
    $scope.user = angular.copy(UserSession.user);

    $scope.userInfo = function() {
      console.log('here')
      $http.post(apiUrl + '/users/update', { user: $scope.user, user_id: UserSession.user.id }, {})
      .then(function(response) {
        $window.localStorage.removeItem('current-user');
        $window.localStorage.setItem('current-user', JSON.stringify(response.data.user));
        UserSession.reload();
        $scope.user = response.data.user;
        $ionicPopup.alert({
          title: 'Success!'
        });
      }).catch(function(err) {
        console.log(err);
      })
    }
  }
