define([
  'management/app',
  'tpl!management/apps/posts/show/templates/missing.tpl',
  'tpl!management/apps/posts/show/templates/view.tpl'
], function (PostManager, missingTpl, viewTpl) {
  PostManager.module('PostsApp.Show.View', function (
    View, 
    PostManager, 
    Backbone, 
    Marionette, 
    $, 
    _
  ) {
    View.MissingPost = Marionette.ItemView.extend({
      template: missingTpl
    });

    View.Post = Marionette.ItemView.extend({
      template: viewTpl,

      events: {
        'click a.js-edit': 'editClicked'
      },

      editClicked: function (e) {
        e.preventDefault();
        this.trigger('post:edit', this.model);
      }
    });
  });

  return PostManager.PostsApp.Show.View;
});