/**
 * Configuration example
 * @author Anton Shevchuk
 */
/*global define,require*/
require.config({
    // why not simple "js"? Because IE eating our minds!
    baseUrl: '/bundles/app/js',
    // if you need disable JS cache
    urlArgs: "bust=" + (new Date()).getTime(),
    paths: {
        "bootstrap": './vendor/bootstrap.min.js',
        "underscore": 'vendor/marionette/underscore',
        "jquery": 'vendor/marionette/jquery',
        "json2": 'vendor/marionette/json2',
        "backbone": 'vendor/marionette/backbone',
        "marionette": 'vendor/marionette/backbone.marionette',
        "jquery-ui": "vendor/jquery-ui"
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
      "jquery-ui": ["jquery"]
    },
    enforceDefine: true
});

require(['management/app'], function (PostManager) {
  PostManager.start();
});
