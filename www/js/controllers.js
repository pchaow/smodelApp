angular.module('starter.controllers', ['starter.services','ionic'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout,LoginServices) {

        console.log(ionic.Platform.platform())

        // Form data for the login modal
        $scope.loginData = {};
        $scope.currentUser = null;

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.loginModal = modal;
        });

        // Triggered in the login modal to close it
        $scope.closeLogin = function () {
            $scope.loginModal.hide();
        };

        // Open the login modal
        $scope.login = function () {
            $scope.loginModal.show();
        };

        // Perform the login action when the user submits the login form
        $scope.doLogin = function () {
            console.log('Doing login', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system

            //$timeout(function () {
            //    $scope.closeLogin();
            //    $scope.currentUser = {
            //        title : "นาย",
            //        firstname : "เชาวน์",
            //        lastname : "ปอแก้ว",
            //        faculty : {
            //            name_th : "คณะเทคโนโลยีสารสนเทศและการสื่อสาร"
            //        },
            //        logo : {
            //            url : "/img/testavatar.jpg"
            //        }
            //
            //    };
            //}, 1000);


            LoginServices.login($scope.loginData)
                .success(function(response){
                    console.log(response);
                    $scope.currentUser = response;
                    $scope.closeLogin();
                })
        };

        // Logout
        $ionicModal.fromTemplateUrl('templates/logout.html', {
            scope: $scope
        }).then(function (modal) {
            $scope.logoutModal = modal;
        });

        $scope.closeLogout = function () {
            $scope.logoutModal.hide();
        };

        $scope.logout = function () {
            $scope.logoutModal.show();
        };

        $scope.doLogout = function () {
            console.log('Doing logout', $scope.loginData);

            // Simulate a login delay. Remove this and replace with your login
            // code if using a login system
            $timeout(function () {
                $scope.closeLogout();
                $scope.currentUser  = null;
            }, 1000);
        };

    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            {title: 'Reggae', id: 1},
            {title: 'Chill', id: 2},
            {title: 'Dubstep', id: 3},
            {title: 'Indie', id: 4},
            {title: 'Rap', id: 5},
            {title: 'Cowbell', id: 6}
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    });
