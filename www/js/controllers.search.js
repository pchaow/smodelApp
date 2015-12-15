angular.module('starter.controllers')

    .controller('SearchCtrl', function ($ionicHistory,
                                        $state) {

        var vm = this;

        vm.goBack = function () {
            $state.back();
            console.log('test');
        }

    })