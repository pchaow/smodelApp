angular.module('starter.controllers')

    .controller('ProjectCtrl', function ($scope,
                                         $stateParams,
                                         $ionicHistory,
                                         $state,
                                         project) {

        var vm = this;
        vm.goBack = function () {
            $state.back();
        }
        console.log(project);

        vm.project = project;
    })