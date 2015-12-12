angular.module('starter.services', ['ionic',])
    .factory('API', function () {


        var USE_LOCAL_API = true;

        var LOCAL_BASE_URL = "http://success.local";
        var GLOBAL_BASE_URL = "http://mct.ict.up.ac.th:10000";

        var API_BASE_PATH = "/m1";

        return {
            api_base_url: function () {
                if (USE_LOCAL_API) {
                    return LOCAL_BASE_URL + API_BASE_PATH;
                } else {
                    return GLOBAL_BASE_URL + API_BASE_PATH;
                }
            },

            base_url: function () {
                if (USE_LOCAL_API) {
                    return LOCAL_BASE_URL;
                } else {
                    return GLOBAL_BASE_URL;
                }
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
            ,projects : function($faculty){
                $id = $faculty.id;
                return $http({
                    method: 'GET',
                    url: base_url + '/faculty/'+$id+'/project'
                })
            }
        }
    })

