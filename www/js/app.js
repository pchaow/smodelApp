// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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

    .run(function ($rootScope, $ionicLoading) {
        $rootScope.$on('loading:show', function () {
            //console.log('loading:show');
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            })
        })

        $rootScope.$on('loading:hide', function () {
            //console.log('loading:hide');
            $ionicLoading.hide()
        })
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

            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'templates/menu.html',
                controller: 'AppCtrl',
                controllerAs: 'app'
            })

            .state('search', {
                url: '/search',
                templateUrl: 'templates/search.html',
            })

            .state('browse', {
                url: '/browse',
                templateUrl: 'templates/browse.html'
            })

            .state('app.success', {
                url: '/success',
                abstract: true,
                views: {
                    'menuContent': {
                        templateUrl: 'templates/success/tabs.html'
                    }
                }
            })

            .state('app.success.list', {
                url: '/list',
                views: {
                    'tab-list': {
                        templateUrl: 'templates/success/lists.html',
                        controller: 'SuccessListCtrl',
                        controllerAs: 'listCtrl'
                    }
                }
            })

            .state('app.success.recommend', {
                url: '/recommend',
                views: {
                    'tab-recommend': {
                        templateUrl: 'templates/success/recommend.html'
                    }
                }

            })
        ;
        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/app/success/list');
    });
