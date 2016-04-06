// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ion-gallery', 'ionic-material'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }


        });
    })
    .constant("Debugging", false)
    .constant("GlobalConfig", {
        "url": "http://mct.ict.up.ac.th",
        "port": "10000"
    })
    .constant("LocalConfig", {
        "url": "http://success5.local",
        "port": "80"
    })
    .constant("APIBasePath", "/m1")

    .run(function ($rootScope, Debugging, GlobalConfig, LocalConfig, APIBasePath, $ionicLoading) {
        if (Debugging) {
            $rootScope.BASE_URL = LocalConfig.url + ":" + LocalConfig.port
        } else {
            $rootScope.BASE_URL = GlobalConfig.url + ":" + GlobalConfig.port
        }

        $rootScope.API_BASE_URL = $rootScope.BASE_URL + APIBasePath;

        $rootScope.loadCount = 0;

        $rootScope.$on('loading:show', function () {
            //console.log('loading:show');
            $rootScope.loadCount++;
            if ($rootScope.loadCount == 1) {
                $ionicLoading.show({
                    template: '<p>Loading...</p><ion-spinner></ion-spinner>'
                })
            }

        })


        $rootScope.$on('loading:hide', function () {
            //console.log('loading:hide');
            $rootScope.loadCount--;
            if ($rootScope.loadCount == 0) {
                $ionicLoading.hide()
            }

        })

        $rootScope.$on('$stateChangeStart', function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            })
        });


        $rootScope.$on('$stateChangeSuccess', function () {
            $ionicLoading.hide()
        });

    })


    .config(function ($httpProvider) {
        $httpProvider.interceptors.push(function ($rootScope, $q) {
            return {
                request: function (config) {
                    $rootScope.$broadcast('loading:show')
                    return config
                },
                response: function (response) {
                    $rootScope.$broadcast('loading:hide')
                    return response
                },
                responseError: function (rejection) {
                    $rootScope.$broadcast('loading:hide')
                    return $q.reject(rejection);
                }
            }
        })
    })


    .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $ionicConfigProvider.tabs.position("top");

        $stateProvider

            .state('maps', {
                url: '/maps',
                templateUrl: 'templates/maps.html',
                resolve: {

                },
                controller: 'MapCtrl',
                controllerAs: 'vm',
            })

            .state('projects', {
                url: '/project',
                templateUrl: 'templates/listprojects.html',
                resolve: {
                    projects: function (ProjectService, $stateParams) {
                        return ProjectService.all();
                    }
                },
                controller: 'ProjectListCtrl',
                controllerAs: 'vm',
            })

            .state('project-detail', {
                url: '/project-detail/:id',
                templateUrl: 'templates/project-detail.html',
                resolve: {
                    project: function (DataService, $stateParams) {
                        return DataService.getCurrentProject($stateParams.id, false);
                    }
                },
                controller: 'ProjectDetailCtrl',
                controllerAs: 'vm',
            })

            .state('project-map', {
                url: '/project/:id/map',
                templateUrl: 'templates/project-map.html',
                resolve: {
                    project: function (DataService, $stateParams) {
                        return DataService.getCurrentProject($stateParams.id, false);
                    }
                },
                controller: 'ProjectMapCtrl',
                controllerAs: 'vm',
            })
            .state('search', {
                url: '/search/:keyword',
                templateUrl: 'templates/search.html',
                resolve: {
                    projects: function (ProjectService, $stateParams) {
                        return ProjectService.search($stateParams.keyword)
                    }
                },
                controller: 'SearchCtrl',
                controllerAs: 'vm',
            })
            .state('project', {
                url: '/project/:id',
                templateUrl: 'templates/project.html',
                resolve: {
                    project: function (DataService, $stateParams) {
                        return DataService.getCurrentProject($stateParams.id, true);
                    }
                },
                controller: 'ProjectCtrl',
                controllerAs: 'ProjectCtrl',
            })

            .state('about', {
                url: '/about',
                templateUrl: 'templates/about.html',
                controller: 'HomeCtrl'
            })

            .state('contact', {
                url: '/contact',
                templateUrl: 'templates/contact.html',
                controller: 'HomeCtrl'
            })

            .state('news', {
                url: '/news-test',
                templateUrl: 'templates/news_list.html',
                controller: 'NewsCtrl',
                controllerAs: 'vm',
                resolve: {
                    news: function (NewsService, $stateParams) {
                        return NewsService.all();
                    }
                },
            })

            .state('news-detail', {
                url: '/news-detail/:id',
                templateUrl: 'templates/news-detail.html',
                resolve: {
                    news: function (NewsService, $stateParams) {
                        return NewsService.get($stateParams.id);
                    }
                },
                controller: 'NewsDetailCtrl',
                controllerAs: 'vm',
            })

            .state('home', {
                url: '/home',
                templateUrl: 'templates/home.html',
                controller: 'HomeCtrl'
            })
        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');
    });
