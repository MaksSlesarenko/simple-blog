/**
 * Configuration example
 * @author Anton Shevchuk
 */
require.config({
  baseUrl: '/bundles/app/js',
  // urlArgs: "bust=" + (new Date()).getTime(),
  // enforceDefine: true,
  paths: {
    "bootstrap": './vendor/bootstrap.min.js',
    "underscore": './vendor/underscore',
    "jquery": './vendor/jquery',
    "json2": './vendor/json2',
    "backbone": './vendor/backbone',
    "backbone.picky": "vendor/backbone.picky",
    "backbone.syphon": "vendor/backbone.syphon",
    "marionette": './vendor/backbone.marionette',
    "jquery-ui": "./vendor/jquery-ui",
    "localstorage": './vendor/backbone.localStorage',
    "spin": "./vendor/spin",
    "spin.jquery": "./vendor/spin.jquery",
    "text": "./vendor/text",
    "tpl": "./vendor/underscore-tpl"
  },
  shim: {
    "bootstrap": {
      deps: ['jquery'],
      exports: '$.fn.popover'
    },
    "json2": {
      exports: 'JSON'
    },
    "backbone": {
      deps: ['underscore', 'jquery', 'json2'],
      exports: 'Backbone'
    },
    "underscore": {
      exports: '_'
    },
    "marionette": {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "localstorage": ['backbone'],
    "jquery-ui": ["jquery"],
    "backbone.picky": ["backbone"],
    "backbone.syphon": ["backbone"],
    "spin.jquery": ["spin", "jquery"],
    "tpl": ["text"]
  }
});

require([
  "management/app",
  "management/apps/header/header_app",
  "management/apps/posts/posts_app_router"
], function(PostManager){
  PostManager.start();
});
