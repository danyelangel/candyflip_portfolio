(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name article.service:Article
   *
   * @description
   *
   */
  angular
    .module('candyflip')
    .service('Article', Article);

  function Article(Card, Text, $q) {
    var self = this,
        ArticleCrud;

    self.init = init;
    self.get = get;
    self.create = create;
    self.remove = remove;
    self.addCard = addCard;
    self.removeCard = removeCard;

    function init(_ArticleCrud) {
      ArticleCrud = _ArticleCrud;
      self.crud = ArticleCrud;
    }

    function get(articleKey) {
      var deferred = $q.defer();
      if (articleKey) {
        ArticleCrud.get(articleKey).then(deferred.resolve);
      } else {
        ArticleCrud.list().then(deferred.resolve);
      }
      return deferred.promise;
    }

    function create() {
      // Create text. Returns reference
      Text.create().then(function (textRef) {
        var articleModel = {
          textKey: textRef.key()
        };
        // Add article
        ArticleCrud.add(articleModel);
      });
    }

    function addCard(articleKey) {
      // Create card. Returns reference
      Card.create().then(function (cardRef) {
        // Add card to article
        ArticleCrud.addChild(cardRef.key(), articleKey);
      });
    }

    function remove(articleKey) {
      var deferred = $q.defer();
      if (articleKey) {
        ArticleCrud.get(articleKey).then(function (articleObj) {
          Text.remove(articleObj.textKey).then(function () {
            removeChildren(articleObj.children, articleKey).then(function () {
              ArticleCrud.remove(articleKey).then(deferred.resolve);
            });
          });
        });
      } else {
        console.log('Could not remove article since there is no key');
      }
      return deferred.promise;
    }

    function removeChildren(children, articleKey) {
      var deferred = $q.defer(),
          count = 0;
      if (children) {
        angular.forEach(children, function (cardKey) {
          count++;
          removeCard(cardKey, articleKey).then(function () {
            count--;
            if (!count) {
              deferred.resolve();
            }
          });
        });
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function removeCard(index, cardKey, articleKey) {
      var deferred = $q.defer();
      ArticleCrud.removeChild(index, articleKey).then(function () {
        Card.remove(cardKey).then(deferred.resolve);
      });
      return deferred.promise;
    }
  }
}());
