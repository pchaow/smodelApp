angular.module('starter.services', ['ionic',])
    .factory('DataService', function ($q, $rootScope, ProjectService) {
        var project = [];
        return {
            getCurrentProject: function (id, reload) {
                var deferred = $q.defer();

                if (!reload) {

                    if (project[id]) {
                        return project[id];
                    } else {
                        ProjectService.get(id).success(function (r) {
                            deferred.resolve(r);

                        })
                    }
                } else {

                    ProjectService.get(id).success(function (r) {
                        deferred.resolve(r);

                    })

                }


                project[id] = deferred.promise;


                return project[id];
            },
            setCurrentProject: function (id, value) {
                project[id] = value;
            }
        };

    })
    .factory('API', function ($rootScope) {

        var API_BASE_URL = $rootScope.API_BASE_URL;
        var BASE_URL = $rootScope.BASE_URL;

        return {
            api_base_url: function () {
                return API_BASE_URL;
            },

            base_url: function () {
                return BASE_URL;
            }
        }
    })
    .factory('LoginServices', function ($http, API) {
        var base_url = API.api_base_url();

        return {
            login: function (loginData) {
                return $http({
                    method: 'POST',
                    url: base_url + '/auth/login',
                    data: loginData
                })
            }
        }

    })

    .factory('FacultyService', function ($http, API) {
        var base_url = API.api_base_url();

        return {
            all: function () {
                return $http({
                    method: 'GET',
                    url: base_url + '/faculty'
                })
            }
            , projects: function ($faculty) {
                $id = $faculty.id;
                return $http({
                    method: 'GET',
                    url: base_url + '/faculty/' + $id + '/project'
                })
            }
        }
    })
    .factory('ProjectService', function ($http, API) {
        var base_url = API.api_base_url();
        return {
            all: function () {
                return $http({
                    method: 'GET',
                    url: base_url + '/project'
                })
            }
            , get: function ($id) {
                return $http({
                    method: 'GET',
                    url: base_url + '/project/' + $id
                })
            }
            , search: function (keyword) {
                return $http({
                    method: 'GET',
                    url: base_url + "/project/search/" + keyword
                })
            }
        }
    })

    .factory('NewsService', function ($http, API) {
        var base_url = API.api_base_url();
        return {
            all: function () {
                return $http({
                    method: 'GET',
                    url: base_url + '/post'
                })
            }
            , get: function ($id) {
                return $http({
                    method: 'GET',
                    url: base_url + '/post/' + $id
                })
            }
        }
    })

    .factory('MapService', function ($http, API) {
        var base_url = API.api_base_url();
        return {
            get: function ($id) {
                return $http({
                    method: 'GET',
                    url: base_url + '/map-data/' + $id
                })
            },
            getAmphur : function ($amphur) {
                $id = $amphur.amphur_id;
                $name = $amphur.name
                return $http({
                    method: 'GET',
                    url: base_url + '/amphur/' + $id + '/' + $name
                });
            }
        }
    })


