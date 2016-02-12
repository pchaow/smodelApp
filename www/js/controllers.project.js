angular.module('starter.controllers')

    .controller('ProjectCtrl', function ($rootScope,
                                         $scope,
                                         $stateParams,
                                         $ionicScrollDelegate,
                                         $ionicHistory,
                                         $state,
                                         $sce,
                                         project) {

        var vm = this;
        vm.goBack = function () {
            $state.back();
        }

        console.log(project);

        vm.project = project;
        if (project.description_th) {
            vm.project.description_th_sce = $sce.trustAsHtml(vm.project.description_th);
        }

        if (project.description_en) {
            vm.project.description_en_sce = $sce.trustAsHtml(vm.project.description_en);
        }

        if (project.youtubes) {
            for (i = 0; i < project.youtubes.length; i++) {
                vm.project.youtubes[i].url = $sce.trustAsResourceUrl("http://www.youtube.com/embed/" + project.youtubes[i].youtube_id);
            }
        }

        vm.project.photo_items = [];
        if(project.photos){

            project.photos.forEach(function(a,b){
                vm.project.photo_items.push({
                    src: $rootScope.API_BASE_URL +'/project/'+project.id+'/photos/'+a.filename,
                    thumb: $rootScope.API_BASE_URL +'/project/'+project.id+'/photos/'+a.filename+"?w=300&h=300&fit=crop",
                    sub: ''
                })
            })

        }

    })

    .controller('ProjectDetailCtrl', function ($scope,
                                               $stateParams,
                                               $ionicScrollDelegate,
                                               $ionicHistory,
                                               $state,
                                               $sce,
                                               project) {

        var vm = this;
        vm.goBack = function () {
            $state.back();
        }
        vm.project = project;

        if (project.description_th) {
            vm.project.description_th_sce = $sce.trustAsHtml(vm.project.description_th);
        }

        if (project.description_en) {
            vm.project.description_en_sce = $sce.trustAsHtml(vm.project.description_en);
        }
    })

    .controller('ProjectMapCtrl', function ($scope,
                                            $stateParams,
                                            $ionicScrollDelegate,
                                            $ionicHistory,
                                            $state,
                                            $sce,
                                            project) {

        var vm = this;
        vm.goBack = function () {
            $state.back();
        }
        vm.project = project;

        var map;
        var geoJsonInput = {};
        geoJsonInput.value = project.geojson;

        function refreshGeoJsonFromData() {
            map.data.toGeoJson(function (geoJson) {
                geoJsonInput.value = JSON.stringify(geoJson, null, 2);
            });
        }

        function bindDataLayerListeners(dataLayer) {
            dataLayer.addListener('addfeature', refreshGeoJsonFromData);
            dataLayer.addListener('removefeature', refreshGeoJsonFromData);
            dataLayer.addListener('setgeometry', refreshGeoJsonFromData);
        }

        function loadJsonFromString() {
            if (geoJsonInput.value) {
                var geojson = JSON.parse(geoJsonInput.value);
                map.data.addGeoJson(geojson);
                zoom(map);

                setTimeout(function () {
                    map.setZoom(10);
                }, 300)
            }
        }

        function processPoints(geometry, callback, thisArg) {
            if (geometry instanceof google.maps.LatLng) {
                callback.call(thisArg, geometry);
            } else if (geometry instanceof google.maps.Data.Point) {
                callback.call(thisArg, geometry.get());
            } else {
                geometry.getArray().forEach(function (g) {
                    processPoints(g, callback, thisArg);
                });
            }
        }

        function zoom(map) {
            var bounds = new google.maps.LatLngBounds();
            var count = 0;
            map.data.forEach(function (feature) {
                count++;
                processPoints(feature.getGeometry(), bounds.extend, bounds);
            });
            if (count > 0) {
                map.fitBounds(bounds);
            }
        }

        function initialize() {

            map = new google.maps.Map(document.getElementById('gmap'), {
                center: new google.maps.LatLng(19.2178981, 100.1890168),
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoomControl: true
            });

            loadJsonFromString();

            bindDataLayerListeners(map.data);

        }

        initialize();

    })