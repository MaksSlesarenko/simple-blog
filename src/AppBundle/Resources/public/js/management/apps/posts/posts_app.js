/**
 * Created by lekskazimirchuk on 4/7/16.
 */
PostManager.module("PostsApp", function (
  PostsApp,
  PostManager,
  Backbone,
  Marionette,
  $,
  _
) {
  PostsApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "posts": "listPosts",
      "posts/:id": "showPost"
    }
  });

  var API = {
    listPosts: function () {
      PostsApp.List.Controller.listPosts();
    },
    showPost: function(id) {
      PostsApp.Show.Controller.showPost(id);
    }
  };
    
  PostManager.on("posts:list", function () {
    PostManager.navigate("posts");
    API.listPosts();
  });

  PostManager.on("post:show", function (id) {
    PostManager.navigate("posts/" + id);
    API.showPost(id)
  });

  PostManager.addInitializer(function () {
    new PostsApp.Router({
      controller: API
    });
  });
});