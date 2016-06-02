/**
 * Created by lekskazimirchuk on 6/3/16.
 */
define(["management/app", "management/apps/header/list/list_view"], function(PostManager, View){
  PostManager.module("HeaderApp.List", function(List, PostManager, Backbone, Marionette, $, _){
    List.Controller = {
      listHeader: function(){
        require(["management/entities/header"], function(){
          var links = PostManager.request("header:entities");
          var headers = new View.Headers({collection: links});

          headers.on("brand:clicked", function(){
            PostManager.trigger("posts:list");
          });

          headers.on("childview:navigate", function(childView, model){
            var trigger = model.get("navigationTrigger");
            PostManager.trigger(trigger);
          });

          PostManager.regions.header.show(headers);
        });
      },

      setActiveHeader: function(headerUrl){
        var links = PostManager.request("header:entities");
        var headerToSelect = links.find(function(header){ return header.get("url") === headerUrl; });
        headerToSelect.select();
        links.trigger("reset");
      }
    };
  });

  return PostManager.HeaderApp.List.Controller;
});