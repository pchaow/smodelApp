angular.module('starter.controllers')

    .controller('SuccessListCtrl', function ($rootScope,
                                             $ionicSideMenuDelegate,
                                             $scope,
                                             $state,
                                             $ionicModal,
                                             $ionicViewSwitcher,
                                             $ionicPopup,
                                             $timeout,
                                             FacultyService,
                                             ProjectService) {


        var vm = this;

        vm.selectFacultyModal = null;
        vm.projects = null;
        $scope.currentProject = null;

        function initialize(){
            ProjectService.all()
                .success(function(r){
                    vm.projects = r;
                    console.log(r);
                })
        }

        initialize();

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

        vm.selectFaculty = function (faculty) {
            $scope.currentFaculty = faculty;
            vm.closeSelectFacultyModal();

            if ($scope.currentFaculty) {
                FacultyService.projects($scope.currentFaculty)
                    .success(function (r) {
                        console.log(r);
                        vm.projects = r;
                    })
            }else {
                initialize();
            }
        }

        vm.showProject = function(project){
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $scope.currentProject = project;
            $state.go('project');
        }

    })