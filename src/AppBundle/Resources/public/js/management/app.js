/**
 * Created by lekskazimirchuk on 6/1/16.
 */
define([
  "marionette",
  "management/apps/config/marionette/regions/dialog"
], function (Marionette) {
  var PostManager = new Marionette.Application();

  PostManager.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
      el: "#dialog-region"
    })
  });

  PostManager.navigate = function (route, options) {
    options || (options={});
    Backbone.history.navigate(route, options);
  };

  PostManager.getCurrentRoute = function () {
    return Backbone.history.fragment;
  };

  PostManager.on("start", function(){
    if (Backbone.history) {
      Backbone.history.start();
      console.log("Wake up, Neo!");
      // if (this.getCurrentRoute() === "") {
      //   PostManager.trigger("posts:list");
      // }
    }
  });

  return PostManager;
});
