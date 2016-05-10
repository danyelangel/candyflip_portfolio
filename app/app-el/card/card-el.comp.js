(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name card.directive:cardEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="card">
       <file name="index.html">
        <card-el></card-el>
       </file>
     </example>
   *
   */
  angular
    .module('cardEl', ['oblador.lazytube', 'ngSanitize'])
    .component('cardEl', {
      transclude: true,
      templateUrl: 'app-el/card/card-el.tpl.html',
      bindings: {
        wcReady: '=',
        wcKey: '<'
      },
      controller: ['$scope', '$window', '$timeout', '$sce', '$document', '$mdDialog', 'Card', 'Text', 'Lang', 'Data', function cardEl($scope, $window, $timeout, $sce, $document, $mdDialog, Card, Text, Lang, Data) {
        var $ctrl = this;

        // Edit api
        $ctrl.editSoundcloud = editSoundcloud;
        $ctrl.editYoutube = editYoutube;
        $ctrl.addGallery = addGallery;
        $ctrl.removeGallery = removeGallery;

        // Change language on language change
        Lang.onChange(function () {
          $ctrl.lang = Lang.current;
        });

        // Change auth data on authentication change
        Data.onAuth(function (authData) {
          $ctrl.authData = authData;
          $ctrl.unauthing = true;
        });

        // Watch data and update scope on data change
        $scope.$watch('$ctrl.wcKey', getCardData);
        $scope.$watch('$ctrl.card.soundcloud', getSoundcloud);
        $scope.$watch('$ctrl.card.youtube', getYoutube);

        function getCardData() {
          Card.get($ctrl.wcKey).then(function (card) {
            card.$bindTo($scope, '$ctrl.card');
            Text.get(card.textKey).then(function (text) {
              text.$bindTo($scope, '$ctrl.text');
              $timeout(function () {
                $ctrl.wcReady = true;
              });
            });
          });
        }

        function getSoundcloud(url) {
          if (url) {
            $window.SC.oEmbed(url, {
              maxheight: 120,
              color: '#666666'
            }).then(function (response) {
              // Remove background and make interface grey
              var responseEdited = response.html.replace('visual=true', 'visual=false');
              responseEdited = responseEdited.replace('show_artwork=true', 'show_artwork=false');
              $ctrl.soundcloudHtml = $sce.trustAsHtml(responseEdited);
              $scope.$apply();
            });
          }
        }

        function getYoutube(url) {
          $ctrl.youtube = null;
          $timeout(function () {
            $ctrl.youtube = url;
          });
        }

        // Card edit events
        function editSoundcloud() {
          launchDialog('soundcloud');
        }

        function editYoutube() {
          launchDialog('youtube');
        }

        function addGallery() {
          Card.addGallery($ctrl.key);
        }

        function removeGallery() {
          Card.removeGallery($ctrl.card.galleryKey, $ctrl.key);
        }
        // Dialog Launcher
        function launchDialog(type) {
          var DialogControllers = {
            soundcloud: soundcloudCtrl,
            youtube: youtubeCtrl
          };
          $mdDialog.show({
            controller: ['$scope', DialogControllers[type]],
            templateUrl: 'app-el/card/' + type + '-dialog.tpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose: true
          })
          .then(function (answer) {
            if (answer) {
              $ctrl.card[type] = answer;
            } else {
              $ctrl.card[type] = null;
            }
          }, function () {
            console.log('denied');
          });
        }

        function soundcloudCtrl($innerScope) {
          $innerScope.getSoundcloud = getSoundcloudPreview;
          $innerScope.cancel = $mdDialog.cancel;
          $innerScope.remove = $mdDialog.hide;
          $innerScope.done = done;
          if ($ctrl.soundcloudHtml) {
            $innerScope.urlIsValid = true;
          }
          $innerScope.url = angular.copy($ctrl.card.soundcloud);
          $innerScope.soundcloudHtml = angular.copy($ctrl.soundcloudHtml);

          function done() {
            $mdDialog.hide($innerScope.url);
          }

          function getSoundcloudPreview(url) {
            if (url) {
              $window.SC.oEmbed(url, {
                maxheight: 120,
                color: '#666666'
              }).then(function (response) {
                // Remove background and make interface grey
                var responseEdited = response.html.replace('visual=true', 'visual=false');
                $innerScope.soundcloudHtml = $sce.trustAsHtml(responseEdited);
                $innerScope.urlIsValid = true;
                $innerScope.$apply();
              }, function () {
                $innerScope.soundcloudHtml = '';
                $innerScope.urlIsValid = false;
                $innerScope.$apply();
              });
            }
          }
        }

        function youtubeCtrl($innerScope) {
          $innerScope.cancel = $mdDialog.cancel;
          $innerScope.done = done;
          $innerScope.remove = $mdDialog.hide;
          $innerScope.updateUrl = updateUrl;
          $innerScope.url = angular.copy($ctrl.card.youtube);

          function done() {
            $mdDialog.hide($innerScope.url);
          }

          function updateUrl(url) {
            var tempUrl = url;
            $innerScope.url = null;
            $timeout(function () {
              $innerScope.url = tempUrl;
            });
          }
        }
      }]
    });
}());
