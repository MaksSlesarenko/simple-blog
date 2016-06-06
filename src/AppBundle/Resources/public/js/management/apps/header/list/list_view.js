/**
 * Created by lekskazimirchuk on 6/3/16.
 */
define([
  'management/app',
  'tpl!management/apps/header/list/templates/list.tpl',
  'tpl!management/apps/header/list/templates/list_item.tpl'
], function (PostManager, listTpl, listItemTpl) {
  PostManager.module('HeaderApp.List.View', function (
    View,
    PostManager,
    Backbone,
    Marionette,
    $,
    _
  ) {
    View.Header = Marionette.ItemView.extend({
      template: listItemTpl,
      tagName: 'li',

      events: {
        'click a': 'navigate'
      },

      navigate: function (e) {
        e.preventDefault();
        this.trigger('navigate', this.model);
      },

      onRender: function () {
        if(this.model.selected){
          // add class so Bootstrap will highlight the active entry in the navbar
          this.$el.addClass('active');
        }
      }
    });

    View.Headers = Marionette.CompositeView.extend({
      template: listTpl,
      className: 'navbar navbar-default navbar-fixed-top',
      childView: View.Header,
      childViewContainer: 'ul',

      events: {
        'click a.brand': 'brandClicked'
      },

      brandClicked: function (e) {
        e.preventDefault();
        this.trigger('brand:clicked');
      }
    });
  });

  return PostManager.HeaderApp.List.View;
});