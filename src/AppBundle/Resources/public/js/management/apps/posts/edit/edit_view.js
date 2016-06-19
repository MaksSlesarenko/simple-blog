/**
 * Created by lekskazimirchuk on 6/2/16.
 */
define([
  'management/app', 
  'management/apps/posts/common/views',
  'tpl!management/apps/posts/common/templates/form-edit.tpl',
  'tpl!management/apps/posts/common/templates/form.tpl',
  'simplemde'
], function (
  PostManager, 
  CommonViews,
  formEditTpl,
  formModalTpl,
  SimpleMDE
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
      getTemplate: function () {
        return this.model.get('isModal') ? formModalTpl : formEditTpl
      },
      onRender: function () {
        this.simplemde = new SimpleMDE({
          element: this.$("#post-body")[0],
          autofocus: true,
          forceSync: true,
          indentWithTabs: false,
          tabSize: 4
        });
        // SimpleMDE.toggleSideBySide(this.simplemde);
        this.$('.js-submit').text('Update post');
      }
    });
  });

  return PostManager.PostsApp.Edit.View;
});