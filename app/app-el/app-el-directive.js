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
    .directive('appEl', appEl);

  function appEl() {
    return {
      restrict: 'E',
      scope: {
        fbUrl: '@'
      },
      bindToController: true,
      templateUrl: 'app-el/app-el-directive.tpl.html',
      replace: false,
      controllerAs: 'app',
      controller: function (Data, Article, Lang) {
        var vm = this;
        vm.addArticle = addArticle;
        vm.removeArticle = removeArticle;
        vm.addCard = addCard;
        vm.removeCard = removeCard;
        vm.unauth = unauth;
        vm.setLang = setLang;
        Lang.onChange(function () {
          vm.lang = Lang.current;
        });

        // Initialize data services
        Data.init(vm.fbUrl);

        // Get auth data
        Data.onAuth(function (authData) {
          vm.authData = authData;
        });

        // Get list of articles
        Article.get().then(function (articles) {
          vm.articles = articles;
        });

        function addArticle() {
          Article.create();
        }

        function removeArticle(articleKey) {
          Article.remove(articleKey);
        }

        function addCard(articleKey) {
          Article.addCard(articleKey);
        }

        function removeCard(index, cardKey, articleKey) {
          Article.removeCard(index, cardKey, articleKey);
        }

        function setLang(lang) {
          Lang.set(lang);
        }

        function unauth() {
          Data.unauth();
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
