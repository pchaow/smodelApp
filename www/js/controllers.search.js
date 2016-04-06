angular.module('starter.controllers')

    .controller('SearchCtrl', function ($ionicHistory,
                                        $state, $stateParams,
                                        $ionicViewSwitcher,
                                        DataService,
                                        ProjectService,
                                        projects) {

        var vm = this;

        console.log(projects.data)

        vm.keyword = $stateParams.keyword
        vm.projects = projects.data

        vm.goBack = function () {
            $state.back();
            console.log('test');
        }

        vm.search = function () {
            ProjectService.search(vm.keyword).success(function (r) {
                vm.projects = r;
            })
        }

        vm.showProject = function (project) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            DataService.setCurrentProject(project.id, project);
            $state.go('project', {id: project.id});
        }

    })