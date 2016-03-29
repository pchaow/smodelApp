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

    .controller('MapCtrl', function ($scope,
                                     $stateParams,
                                     $ionicScrollDelegate,
                                     $ionicHistory,
                                     $state,
                                     $sce) {


        Highcharts.chart('map', {

            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },

            series: [{
                data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
            }]
        });


    })