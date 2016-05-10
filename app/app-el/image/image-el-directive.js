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
     <example module="image">
       <file name="index.html">
        <image-el></image-el>
       </file>
     </example>
   *
   */
  angular
    .module('imageEl', ['ngFileUpload'])
    .directive('imageEl', imageEl);

  function imageEl() {
    return {
      restrict: 'E',
      scope: {
        key: '=',
        imageExists: '=',
        onAdd: '&',
        onRemove: '&'
      },
      bindToController: true,
      transclude: true,
      templateUrl: 'app-el/image/image-el-directive.tpl.html',
      replace: true,
      controllerAs: 'image',
      controller: function ($scope, Data, Image, $mdDialog, $document, $window) {
        var vm = this,
            ospry = new $window.Ospry('pk-test-21d3cmcjpeojedox19m0kc0v');

        vm.setImg = setImg;
        vm.remove = remove;

        // Get auth data
        Data.onAuth(function (authData) {
          vm.authData = authData;
        });

        // Get data when key is ready
        $scope.$watch('image.key', getImageData);
        function getImageData() {
          Image.get(vm.key).then(function (image) {
            image.$bindTo($scope, 'image.image');
            image.$loaded(function () {
              if (image.metadata) {
                vm.imageExists = true;
              }
            });
          });
        }

        // Upload Image
        function setImg(imgFile) {
          var alert;
          if (imgFile) {
            ospry.up({
              files: [imgFile],
              imageReady: imageReady
            });
          } else {
            alert = $mdDialog.alert({
              title: 'Could not upload image',
              textContent: 'Please make sure the image is less than 1000px X 1000px and less than 2MB size.',
              ok: 'Close'
            });
            $mdDialog.show(alert);
          }
          function imageReady(err, metadata) {
            if (err) {
              alert = $mdDialog.alert({
                title: 'Could not upload image',
                textContent: err.message,
                ok: 'Close'
              });
              $mdDialog.show(alert);
            }
            if (!vm.image.metadata) {
              if (angular.isFunction(vm.onAdd())) {
                vm.onAdd()();
              }
            }
            vm.image.metadata = metadata;
            $scope.$apply();
          }
        }

        function remove() {
          vm.image.metadata = null;
          if (angular.isFunction(vm.onRemove())) {
            vm.onRemove()(vm.key);
          }
        }
      }
    };
  }
}());
