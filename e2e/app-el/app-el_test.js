/* global describe, beforeEach, it, browser, expect */
'use strict';

var AppElPagePo = require('./app-el.po');

describe('App el page', function () {
  var appElPage;

  beforeEach(function () {
    appElPage = new AppElPagePo();
    browser.get('/#/app-el');
  });

  it('should say AppElCtrl', function () {
    expect(appElPage.heading.getText()).toEqual('appEl');
    expect(appElPage.text.getText()).toEqual('AppElCtrl');
  });
});
