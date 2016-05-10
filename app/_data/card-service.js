(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name card.service:Card
   *
   * @description
   *
   */
  angular
    .module('candyflip')
    .service('Card', Card);

  function Card($q, Image, Text, Gallery) {
    var self = this,
        CardCrud;

    self.init = init;
    self.get = get;
    self.create = create;
    self.remove = remove;
    self.addGallery = addGallery;
    self.removeGallery = removeGallery;

    function init(_CardCrud) {
      CardCrud = _CardCrud;
      self.crud = CardCrud;
    }

    function get(cardId) {
      var deferred = $q.defer();
      if (cardId) {
        CardCrud.get(cardId).then(deferred.resolve);
      } else {
        CardCrud.list().then(deferred.resolve);
      }
      return deferred.promise;
    }

    function create() {
      var deferred = $q.defer();
      // Create text. Returns reference
      Text.create().then(function (textRef) {
        // Create image. Returns reference
        Image.create().then(function (imageRef) {
          // Create gallery. Returns reference
          Gallery.create().then(function (galleryRef) {
            var cardModel = {
              textKey: textRef.key(),
              imageKey: imageRef.key(),
              galleryKey: galleryRef.key()
            };
            // Create card. Returns reference
            CardCrud.add(cardModel).then(deferred.resolve);
          });
        });
      });
      return deferred.promise;
    }

    function remove(cardKey) {
      var deferred = $q.defer();
      if (cardKey) {
        CardCrud.get(cardKey).then(function (cardObj) {
          Text.remove(cardObj.textKey).then(function () {
            Image.remove(cardObj.imageKey).then(function () {
              Gallery.remove(cardObj.galleryKey).then(function () {
                CardCrud.remove(cardKey).then(deferred.resolve);
              });
            });
          });
        });
      } else {
        console.log('Could not remove card since there is no key');
      }
      return deferred.promise;
    }

    function addGallery(cardKey) {
      var deferred = $q.defer();
      CardCrud.get(cardKey).then(function (cardObj) {
        Gallery.create().then(function (galleryRef) {
          cardObj.galleryKey = galleryRef.key();
          cardObj.$save().then(deferred.resolve);
        });
      });
      return deferred.promise;
    }

    function removeGallery(galleryKey, cardKey) {
      var deferred = $q.defer();
      CardCrud.get(cardKey).then(function (cardObj) {
        Gallery.remove(galleryKey).then(function () {
          cardObj.galleryKey = null;
          cardObj.$save().then(deferred.resolve);
        });
      });
      return deferred.promise;
    }
  }
}());
