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
    .directive('articleEl', articleEl);

  function articleEl() {
    return {
      restrict: 'E',
      scope: {
        data: '='
      },
      bindToController: true,
      transclude: true,
      templateUrl: 'app-el/article/article-el-directive.tpl.html',
      replace: false,
      controllerAs: 'article',
      controller: function ($scope, Data, Text, Lang) {
        var vm = this;
        Data.onAuth(function (authData) {
          vm.authData = authData;
        });
        Lang.onChange(function () {
          vm.lang = Lang.current;
        });
        $scope.$watch('article.data', function () {
          Text.get(vm.data.textKey).then(function (text) {
            text.$bindTo($scope, 'article.text');
          });
        });
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
