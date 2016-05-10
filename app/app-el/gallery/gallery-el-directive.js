(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name image.directive:imageEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="gallery">
       <file name="index.html">
        <gallery-el></gallery-el>
       </file>
     </example>
   *
   */
  angular
    .module('candyflip')
    .directive('galleryEl', galleryEl);

  function galleryEl() {
    return {
      restrict: 'E',
      scope: {
        key: '='
      },
      bindToController: true,
      transclude: true,
      templateUrl: 'app-el/gallery/gallery-el-directive.tpl.html',
      replace: false,
      controllerAs: 'vm',
      controller: function ($scope, Data, Gallery) {
        var vm = this;

        vm.onAdd = onAdd;
        vm.onRemove = onRemove;

        // Get auth data
        Data.onAuth(function (authData) {
          vm.authData = authData;
        });

        // Get data when key is ready
        $scope.$watch('vm.key', getGalleryData);
        function getGalleryData() {
          Gallery.get(vm.key).then(function (gallery) {
            gallery.$bindTo($scope, 'vm.gallery');
          });
        }

        function onAdd() {
          return function () {
            Gallery.addImage(vm.key);
          };
        }

        function onRemove(imageIndex) {
          return function (imageKey) {
            if (Object.keys(vm.gallery.children).length > 1) {
              Gallery.removeImage(imageIndex, imageKey, vm.key);
            }
          };
        }
      }
    };
  }
}());
