define([
  'marionette',
  'bootstrap',
  'management/apps/config/marionette/regions/dialog'
], function (Marionette) {
  var PostManager = new Marionette.Application();

  PostManager.navigate = function (route, options) {
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  PostManager.getCurrentRoute = function () {
    return Backbone.history.fragment
  };

  PostManager.startSubApp = function (appName, args) {
    var currentApp = appName ? PostManager.module(appName) : null;
    if (PostManager.currentApp === currentApp) { return; }

    if (PostManager.currentApp) {
      PostManager.currentApp.stop();
    }

    PostManager.currentApp = currentApp;
    if (currentApp) {
      currentApp.start(args);
    }
  };

  PostManager.on('before:start', function () {
    var RegionContainer = Marionette.LayoutView.extend({
      el: '#app-container',

      regions: {
        header: '#header-region',
        main: '#main-region',
        dialog: Marionette.Region.Dialog.extend({
          el: "#dialog-region"
        })
      }
    });

    PostManager.regions = new RegionContainer();
  });

  PostManager.on('start', function () {
    if (Backbone.history) {
      require(['management/apps/posts/posts_app'], function () {
        Backbone.history.start();

        if (PostManager.getCurrentRoute() === '') {
          PostManager.trigger('posts:list');
        }
      });
    }
  });

  return PostManager;
});