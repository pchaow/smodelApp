angular.module('starter.controllers')

    .controller('AppCtrl', function ($rootScope,
                                     $ionicSideMenuDelegate,
                                     $scope,
                                     $ionicModal,
                                     $ionicPopup,
                                     $timeout,
                                     API,
                                     LoginServices,
                                     FacultyService) {

        var vm = this;

        $rootScope.BASE_URL = API.base_url();
        $scope.faculties = null;
        $scope.currentUser = null;

        function loadFaculty(){
            FacultyService.all()
                .success(function(r){
                    $scope.faculties = r;
                })
        }

        loadFaculty();

        // Form data for the login modal
        vm.loginData = {};
        vm.loginModal = null;

        // Create the login modal that we will use later
        $ionicModal.fromTemplateUrl('templates/login.html', {
            scope: $scope
        }).then(function (modal) {
            vm.loginModal = modal;
        });

        // Triggered in the login modal to close it
        vm.closeLogin = function () {
            vm.loginModal.hide();
        };

        // Open the login modal
        vm.login = function () {
            vm.loginModal.show();
        };

        // Perform the login action when the user submits the login form
        vm.doLogin = function () {

            LoginServices.login(vm.loginData)
                .success(function (response) {
                    console.log(response);
                    $scope.currentUser = response;

                    var loginSuccessPopup = $ionicPopup.alert({
                        title: 'ยินดีต้อนรับ',
                        template: $scope.currentUser.title + $scope.currentUser.firstname + " " + $scope.currentUser.lastname
                    });
                    loginSuccessPopup.then(function (res) {
                        vm.closeLogin();
                    });

                    $timeout(function () {
                        loginSuccessPopup.close();
                        vm.closeLogin();
                    }, 1000)
                })
                .error(function (error) {

                    var arr = Object.keys(error).map(function (k) {
                        return error[k]
                    });

                    var alertPopup = $ionicPopup.alert({
                        title: 'Error!',
                        template: arr[0]
                    });
                    alertPopup.then(function (res) {
                        console.log(res);
                    });
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
                $scope.currentUser = null;
            }, 1000);
        };

    })