/**
 * Created by lekskazimirchuk on 6/3/16.
 */
define(['management/app', 'backbone.picky'], function(PostManager){
  PostManager.module('Entities', function(Entities, PostManager, Backbone, Marionette, $, _){
    Entities.Header = Backbone.Model.extend({
      initialize: function () {
        var selectable = new Backbone.Picky.Selectable(this);
        _.extend(this, selectable);
      }
    });

    Entities.HeaderCollection = Backbone.Collection.extend({
      model: Entities.Header,

      initialize: function () {
        var singleSelect = new Backbone.Picky.SingleSelect(this);
        _.extend(this, singleSelect);
      }
    });

    var initializeHeaders = function () {
      Entities.headers = new Entities.HeaderCollection([
        { name: 'Posts', url: 'posts', navigationTrigger: 'posts:list' }
      ]);
    };

    var API = {
      getHeaders: function () {
        if(Entities.headers === undefined){
          initializeHeaders();
        }
        return Entities.headers;
      }
    };

    PostManager.reqres.setHandler('header:entities', function () {
      return API.getHeaders();
    });
  });

  return ;
});