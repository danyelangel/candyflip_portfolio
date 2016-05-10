(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name text.service:Text
   *
   * @description
   *
   */
  angular
    .module('candyflip')
    .service('Text', Text);

  function Text($q, Lang) {
    var self = this,
        TextCrud;

    self.init = init;
    self.get = get;
    self.create = create;
    self.remove = remove;

    function init(_TextCrud) {
      TextCrud = _TextCrud;
      self.crud = TextCrud;
    }

    function get(textId) {
      var deferred = $q.defer();
      if (textId) {
        TextCrud.get(textId).then(deferred.resolve);
      } else {
        TextCrud.list().then(deferred.resolve);
      }
      return deferred.promise;
    }

    function create() {
      var deferred = $q.defer(),
          model = {};
      angular.forEach(Lang.validLangs, function (language) {
        model[language] = {
          title: '',
          subtitle: '',
          p: '<p><br></p>'
        };
      });
      TextCrud.add(model).then(deferred.resolve);
      return deferred.promise;
    }

    function remove(textKey) {
      var deferred = $q.defer();
      if (textKey) {
        TextCrud.remove(textKey).then(deferred.resolve);
      } else {
        console.log('Could not remove text since there is no key');
      }
      return deferred.promise;
    }
  }
}());
