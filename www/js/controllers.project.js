angular.module('starter.controllers')

    .controller('ProjectCtrl', function ($scope,
                                         $stateParams,
                                         $ionicScrollDelegate,
                                         $ionicHistory,
                                         $state,
                                         project) {

        var vm = this;
        vm.goBack = function () {
            $state.back();
        }

        vm.project = project;

    })