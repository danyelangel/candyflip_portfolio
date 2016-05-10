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
    .directive('footerEl', footerEl);

  function footerEl() {
    return {
      restrict: 'E',
      scope: {
      },
      bindToController: true,
      transclude: true,
      templateUrl: 'app-el/footer/footer-el-directive.tpl.html',
      replace: false,
      controllerAs: 'footer',
      controller: function () {
        var vm = this;
        vm.name = 'Footer';
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
