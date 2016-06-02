/**
 * Created by lekskazimirchuk on 6/2/16.
 */
define(["management/app", "management/apps/posts/common/views"], function(PostManager, CommonViews){
  PostManager.module("PostsApp.New.View", function(View, PostManager, Backbone, Marionette, $, _){
    View.Post = CommonViews.Form.extend({
      title: "New Post",

      onRender: function(){
        this.$(".js-submit").text("Create post");
      }
    });
  });

  return PostManager.PostsApp.New.View;
});