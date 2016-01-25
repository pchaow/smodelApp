angular.module('starter.controllers')

    .controller('ProjectCtrl', function ($scope,
                                         $stateParams,
                                         $ionicScrollDelegate,
                                         $ionicHistory,
                                         $state,
                                         $sce,
                                         project) {

        var vm = this;
        vm.goBack = function () {
            $state.back();
        }

        vm.project = project;

    })

    .controller('ProjectDetailCtrl', function ($scope,
                                         $stateParams,
                                         $ionicScrollDelegate,
                                         $ionicHistory,
                                         $state,
                                         $sce,
                                         project) {

        var vm = this;
        vm.goBack = function () {
            $state.back();
        }
        vm.project = project;
        if(project.content){
            vm.project.content_sce = $sce.trustAsHtml(vm.project.content);
        }
    })