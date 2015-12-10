angular.module('starter.services', ['ionic'])
    .factory('API',function(){

        var USE_LOCAL_API = true;

        var LOCAL_BASE_URL = "http://success.local/m1";
        var GLOBAL_BASE_URL = "http://mct.ict.up.ac.th:10000/m1";

        return {
            base_url : function(){
                if (USE_LOCAL_API){
                    return LOCAL_BASE_URL;
                }else {
                    return GLOBAL_BASE_URL;
                }
            }
        }
    })
    .factory('LoginServices',function($http,API){
        var base_url = API.base_url();

        return {
            login : function(loginData){
                return $http({
                    method : 'POST',
                    url : base_url  + '/auth/login',
                    data : loginData
                })
            }
        }

    })