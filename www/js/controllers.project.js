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

        console.log(project);

        vm.project = project;
        if (project.description_th) {
            vm.project.description_th_sce = $sce.trustAsHtml(vm.project.description_th);
        }

        if (project.description_en) {
            vm.project.description_en_sce = $sce.trustAsHtml(vm.project.description_en);
        }

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

        if (project.description_th) {
            vm.project.description_th_sce = $sce.trustAsHtml(vm.project.description_th);
        }

        if (project.description_en) {
            vm.project.description_en_sce = $sce.trustAsHtml(vm.project.description_en);
        }
    })