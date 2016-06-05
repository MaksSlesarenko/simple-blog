/**
 * Created by lekskazimirchuk on 6/2/16.
 */
define(["management/app", "management/apps/posts/edit/edit_view"], function(
  PostManager, 
  View
){
  PostManager.module("PostsApp.Edit", function(
    Edit,
    PostManager, 
    Backbone, 
    Marionette, 
    $, 
    _
  ){
    Edit.Controller = {
      editPost: function(id){
        require(["management/common/views", "management/entities/post/model"], function(CommonViews){
          var loadingView = new CommonViews.Loading({
            title: "Artificial Loading Delay",
            message: "Data loading is delayed to demonstrate using a loading view."
          });
          PostManager.regions.main.show(loadingView);

          var fetchingPost = PostManager.request("post:entity", id);
          $.when(fetchingPost).done(function(post){
            var view;
            if(post !== undefined){
              view = new View.Post({
                model: post,
                generateTitle: true
              });

              view.on("form:submit", function(data){
                if(post.save(data)){
                  PostManager.trigger("post:show", post.get('id'));
                }
                else{
                  view.triggerMethod("form:data:invalid", post.validationError);
                }
              });
            }
            else{
              view = new PostManager.PostsApp.Show.MissingPost();
            }

            PostManager.regions.main.show(view);
          });
        });
      }
    };
  });

  return PostManager.PostsApp.Edit.Controller;
});