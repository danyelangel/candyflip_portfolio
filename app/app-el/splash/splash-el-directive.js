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
    .module('candyflip')
    .directive('splashEl', splashEl);

  function splashEl() {
    return {
      restrict: 'E',
      scope: {
      },
      bindToController: true,
      transclude: true,
      templateUrl: 'app-el/splash/splash-el-directive.tpl.html',
      replace: false,
      controllerAs: 'splash',
      controller: function () {
        var vm = this;
        vm.name = 'Splash';
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
