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
        "bootstrap": './bootstrap.min',
        "underscore": './marionette/underscore',
        "jquery": './marionette/jquery',
        "json2": './marionette/json2',
        "backbone": './marionette/backbone',
        "marionette": './marionette/backbone.marionette'
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
      }
    },
    enforceDefine: true
});

require(['marionette', 'bootstrap']);
