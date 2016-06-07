/**
 * Created by lekskazimirchuk on 6/2/16.
 */
define(['management/app', 'management/apps/posts/edit/edit_view'], function (
  PostManager, 
  EditView
) {
  PostManager.module('PostsApp.Edit', function (
    Edit,
    PostManager, 
    Backbone, 
    Marionette, 
    $, 
    _
  ) {
    Edit.Controller = {
      editPost: function (id) {
        require([
          'management/common/views',
          'management/entities/post/model'
        ], function (CommonViews) {
          PostManager.regions.main.show(new CommonViews.Loading({
            title: "Loading...",
            message: 'Please, wait!'
          }));
          var fetchingPost = PostManager.request('post:entity', id);
          $.when(fetchingPost).done(function (post) {
            var view;
            if (post !== undefined) {
              // view = new EditView.Post({
              view = new Edit.View.Post({
                model: post
              });

              view.on('form:submit', function (data) {
                if (post.save(data)) {
                  PostManager.trigger('post:show', post.get('id'));
                } else {
                  view.triggerMethod('form:data:invalid', post.validationError);
                }
              });
            } else {
              view = new PostManager.PostsApp.Show.MissingPost();
            }
            PostManager.regions.main.reset();
            PostManager.regions.dialog.show(view);
          });
        });
      }
    };
  });

  return PostManager.PostsApp.Edit.Controller;
});