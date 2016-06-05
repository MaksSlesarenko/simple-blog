/**
 * Created by lekskazimirchuk on 6/5/16.
 */
define([
  "jquery",
  "backbone",
  "management/app",
  "management/apps/config/storage/localstorage"
], function($, Backbone, PostManager, configureStorage){
  var Post = Backbone.Model.extend({
    urlRoot: "posts",

    defaults: {
      title: "",
      description: "",
      body: ""
    },

    validate: function (attrs, options) {
      var errors = {};
      if (!attrs.title) {
        errors.title = "can't be blank";
      }
      if (!attrs.description) {
        errors.description = "can't be blank";
      }
      else {
        if (attrs.description.length > 140) {
          errors.description = "is too big";
        }
      }
      if (!_.isEmpty(errors)) {
        return errors;
      }
    }
  });
  configureStorage(Post);
  var API={
    getPostEntity: function(postId){
      var post = new Post({id: postId});
      var defer = $.Deferred();
      setTimeout(function () {
        post.fetch({
          success: function (data) {
            defer.resolve(data);
          },
          error: function (data) {
            defer.resolve(undefined);
          }
        });
      }, 2000);
      return defer.promise();
    }
  };
  PostManager.reqres.setHandler("post:entity", function(id){ 
    return API.getPostEntity(id);
  });
  PostManager.reqres.setHandler("post:entity:new", function(id){ 
    return new Post();
  });
  return Post;
});