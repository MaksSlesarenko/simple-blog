/**
 * Created by lekskazimirchuk on 4/3/16.
 */
PostManager.module("PostsApp.List", function (
  List,
  PostManager,
  Backbone,
  Marionette,
  $,
  _
) {
  List.Controller = {
    listPosts: function () {
      var posts = PostManager.request("post:entities");

      var postsListView = new List.Posts({
        collection: posts
      });

      postsListView.on("childview:post:delete", function (childView, model) {
        model.destroy();
      });
        
      postsListView.on("childview:post:show", function (childView, model) {
          PostManager.trigger("post:show", model.get("id"));
          PostManager.PostsApp.Show.Controller.showPost(model);
      });

      PostManager.mainRegion.show(postsListView);
    }
  };
});