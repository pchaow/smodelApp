angular.module('starter.controllers')

    .controller('NewsListCtrl', function ($rootScope,
                                          $scope,
                                          $stateParams,
                                          $ionicViewSwitcher,
                                          $ionicScrollDelegate,
                                          $ionicHistory,
                                          $state,
                                          $sce,
                                          news) {

        var vm = this;

        vm.news = news.data;

        console.log(news.data)

        vm.showNews = function (news) {
            $ionicViewSwitcher.nextDirection('forward'); // 'forward', 'back', etc.
            $state.go('news-detail', {id: news.id});
        }

    })

    .controller('NewsDetailCtrl', function ($rootScope,
                                            $scope,
                                            $stateParams,
                                            $ionicViewSwitcher,
                                            $ionicScrollDelegate,
                                            $ionicHistory,
                                            $state,
                                            $sce,
                                            news) {

        var vm = this;

        vm.news = news.data;

        vm.news.content_sce = $sce.trustAsHtml(vm.news.content);

        vm.news.photo_items = [];
        if(vm.news.photos){

            vm.news.photos.forEach(function(a,b){
                vm.news.photo_items.push({
                    src: $rootScope.API_BASE_URL +'/post/'+vm.news.id+'/photos/'+a.filename,
                    thumb: $rootScope.API_BASE_URL +'/post/'+vm.news.id+'/photos/'+a.filename+"?w=300&h=300&fit=crop",
                    sub: ''
                })
            })

        }

    })