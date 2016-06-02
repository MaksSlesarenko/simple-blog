/**
 * Created by lekskazimirchuk on 6/2/16.
 */
define(["management/app"], function(PostManager){
  PostManager.module("Routers.PostsApp", function(
    PostsAppRouter, 
    PostManager, 
    Backbone, 
    Marionette, 
    $, 
    _
  ){
    PostsAppRouter.Router = Marionette.AppRouter.extend({
      appRoutes: {
        "posts(/filter/criterion::criterion)": "listPosts",
        "posts/:id": "showPost",
        "posts/:id/edit": "editPost"
      }
    });

    var executeAction = function(action, arg){
      PostManager.startSubApp("PostsApp");
      action(arg);
      PostManager.execute("set:active:header", "posts");
    };

    var API = {
      listPosts: function(criterion){
        require(["management/apps/posts/list/list_controller"], function(ListController){
          executeAction(ListController.listPosts, criterion);
        });
      },

      showPost: function(id){
        require(["management/apps/posts/show/show_controller"], function(ShowController){
          executeAction(ShowController.showPost, id);
        });
      },

      editPost: function(id){
        require(["management/apps/posts/edit/edit_controller"], function(EditController){
          executeAction(EditController.editPost, id);
        });
      }
    };

    PostManager.on("posts:list", function(){
      PostManager.navigate("posts");
      API.listPosts();
    });

    PostManager.on("posts:filter", function(criterion){
      if(criterion){
        PostManager.navigate("posts/filter/criterion:" + criterion);
      }
      else{
        PostManager.navigate("posts");
      }
    });

    PostManager.on("post:show", function(id){
      PostManager.navigate("posts/" + id);
      API.showPost(id);
    });

    PostManager.on("post:edit", function(id){
      PostManager.navigate("posts/" + id + "/edit");
      API.editPost(id);
    });

    PostManager.Routers.on("start", function(){
      new PostsAppRouter.Router({
        controller: API
      });
    });
  });

  return PostManager.PostsAppRouter;
});