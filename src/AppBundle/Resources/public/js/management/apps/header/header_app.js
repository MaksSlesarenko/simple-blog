/**
 * Created by lekskazimirchuk on 6/3/16.
 */
define(["management/app", "management/apps/header/list/list_controller"], function(PostManager, ListController){
  PostManager.module("HeaderApp", function(Header, PostManager, Backbone, Marionette, $, _){
    var API = {
      listHeader: function(){
        ListController.listHeader();
      }
    };

    PostManager.commands.setHandler("set:active:header", function(name){
      ListController.setActiveHeader(name);
    });

    Header.on("start", function(){
      API.listHeader();
    });
  });

  return PostManager.HeaderApp;
});