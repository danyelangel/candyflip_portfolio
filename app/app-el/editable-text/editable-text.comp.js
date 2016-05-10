(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name text.directive:textEl
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="text">
       <file name="index.html">
        <text-el></text-el>
       </file>
     </example>
   *
   */
  angular
    .module('editableTextEl', ['angular-medium-editor'])
    .component('editableTextEl', {
      templateUrl: 'app-el/editable-text/editable-text.tpl.html',
      bindings: {
        // Webcat
        wcModel: '<',
        wcClass: '<',

        // Config
        disableExtraSpaces: '<',
        disableReturn: '<',
        toolbarButtons: '<',
        textPlaceholder: '@',

        // State
        disableEditing: '<'
      },
      controller: ['$scope', '$timeout',
      function editableTextEl($scope, $timeout) {
        var $ctrl = this;

        $scope.$watch('$ctrl.disableEditing', updateComponent);

        function updateComponent() {
          // Editor Options
          $ctrl.editorOptions = {
            targetBlank: true,

            // Config
            disableExtraSpaces: $ctrl.disableExtraSpaces,
            disableReturn: $ctrl.disableReturn,
            toolbar: $ctrl.disableEditing || !$ctrl.toolbarButtons ? false : {
              buttons: $ctrl.toolbarButtons
            },

            // State
            disableEditing: $ctrl.disableEditing
          };

          $ctrl.refreshing = true;
          $timeout(function () {
            $ctrl.refreshing = false;
          });
        }
      }]
    });
}());
