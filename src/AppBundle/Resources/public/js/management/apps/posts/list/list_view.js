define([
  'management/app',
  'tpl!management/apps/posts/list/templates/layout.tpl',
  'tpl!management/apps/posts/list/templates/panel.tpl',
  'tpl!management/apps/posts/list/templates/none.tpl',
  'tpl!management/apps/posts/list/templates/list.tpl',
  'tpl!management/apps/posts/list/templates/list_item.tpl',
  'management/apps/config/marionette/regions/dialog'
], function (PostManager, layoutTpl, panelTpl, noneTpl, listTpl, listItemTpl) {
  PostManager.module('PostsApp.List.View', function (
    View,
    PostManager,
    Backbone,
    Marionette,
    $,
    _
  ) {
    View.Layout = Marionette.LayoutView.extend({
      template: layoutTpl,

      regions: {
        panelRegion: '#panel-region',
        postsRegion: '#posts-region',
        dialog: Marionette.Region.Dialog.extend({
          el: "#dialog-region"
        })
      }
    });

    View.Panel = Marionette.ItemView.extend({
      template: panelTpl,

      triggers: {
        'click button.js-new': 'post:new'
      }
    });

    View.Post = Marionette.ItemView.extend({
      tagName: 'tr',
      template: listItemTpl,

      triggers: {
        'click td a.js-show': 'post:show',
        'click td a.js-edit': 'post:edit',
        'click button.js-delete': 'post:delete'
      },

      events: {
        'click': 'highlightName'
      },

      flash: function (cssClass) {
        var $view = this.$el;
        $view.hide().toggleClass(cssClass).fadeIn(800, function () {
          setTimeout(function () {
            $view.toggleClass(cssClass)
          }, 500);
        });
      },

      highlightName: function (e) {
        this.$el.toggleClass('warning');
      },

      remove: function () {
        var self = this;
        this.$el.fadeOut(function () {
          Marionette.ItemView.prototype.remove.call(self);
        });
      }
    });

    var NoPostsView = Marionette.ItemView.extend({
      template: noneTpl,
      tagName: 'tr',
      className: 'alert'
    });

    View.Posts = Marionette.CompositeView.extend({
      tagName: 'table',
      className: 'table table-hover',
      template: listTpl,
      emptyView: NoPostsView,
      childView: View.Post,
      childViewContainer: 'tbody',
      collectionEvents: {
        'add': 'render',
        'remove': 'render'
      }
    });
  });

  return PostManager.PostsApp.List.View;
});