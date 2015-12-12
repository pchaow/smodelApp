angular.module('starter.controllers')

    .controller('SuccessListCtrl', function ($rootScope,
                                             $ionicSideMenuDelegate,
                                             $scope,
                                             $ionicModal,
                                             $ionicPopup,
                                             $timeout,
                                             API) {


        var vm = this;

        vm.selectFacultyModal = null;

        $ionicModal.fromTemplateUrl('templates/success/lists/facultyModal.html', {
            scope: $scope
        }).then(function (modal) {
            vm.selectFacultyModal = modal;
        });

        // Triggered in the login modal to close it
        vm.closeSelectFacultyModal = function () {
            vm.selectFacultyModal.hide();
        };

        // Open the login modal
        vm.openSelectFacultyModal = function () {
            vm.selectFacultyModal.show();
        };

    })