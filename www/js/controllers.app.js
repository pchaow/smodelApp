angular.module('starter.controllers')

    .controller('AppCtrl', function ($rootScope,
                                     $ionicSideMenuDelegate,
                                     $ionicHistory,
                                     $scope,
                                     $ionicModal,
                                     $ionicPopup,
                                     $timeout,
                                     API,
                                     LoginServices,
                                     FacultyService) {


        var vm = this;

        $scope.faculties = null;
        $scope.currentUser = null;
        $scope.currentFaculty = null;


        function loadFaculty() {
            FacultyService.all()
                .success(function (r) {
                    $scope.faculties = r;
                })
        }

        loadFaculty();
        
    })