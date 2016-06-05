/**
 * Created by lekskazimirchuk on 6/2/16.
 */
define(['management/app', 'management/apps/posts/common/views'], function (
  PostManager, 
  CommonViews
) {
  PostManager.module('PostsApp.Edit.View', function (
    View,
    PostManager, 
    Backbone, 
    Marionette, 
    $, 
    _
  ) {
    View.Post = CommonViews.Form.extend({
      onRender: function () {
        this.$('.js-submit').text('Update post');
      }
    });
  });

  return PostManager.PostsApp.Edit.View;
});