/* globals Firebase */
(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name auromira.service:Data
   *
   * @description
   *
   */
  angular
    .module('candyflip')
    .service('Data', Data);

  function Data(Auth, Lang, FbCrud, Article, Card, Image, Text, Gallery) {
    var self = this;
    // Initialization
    self.init = init;

    // Authentication methods
    self.auth = Auth.auth;
    self.unauth = Auth.unauth;
    self.onAuth = Auth.onAuth;

    // Authentication variables
    self.authData = Auth.authData;

    // Language service
    self.lang = Lang;

    // Data services
    self.image = Image;
    self.text = Text;
    self.card = Card;
    self.article = Article;

    function init(fbUrl) {
      var ref = new Firebase(fbUrl),
          ArticleCrud,
          CardCrud,
          ImageCrud,
          TextCrud,
          GalleryCrud;
      self.ref = ref;
      Auth.init(ref);

      // Init Image
      ImageCrud = FbCrud.newInstance(ref, 'images');
      Image.init(ImageCrud);

      // Init Gallery
      GalleryCrud = FbCrud.newInstance(ref, 'galleries');
      Gallery.init(GalleryCrud);

      // Init Text
      TextCrud = FbCrud.newInstance(ref, 'texts');
      Text.init(TextCrud);

      // Init Card
      CardCrud = FbCrud.newInstance(ref, 'cards');
      Card.init(CardCrud);

      // Init Article
      ArticleCrud = FbCrud.newInstance(ref, 'articles');
      Article.init(ArticleCrud);

      return ref;
    }
  }
}());
