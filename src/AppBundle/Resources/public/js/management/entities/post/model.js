/**
 * Created by lekskazimirchuk on 6/5/16.
 */
define([
  'jquery',
  'backbone',
  'management/app'
], function (
  $,
  Backbone,
  PostManager
) {
  var Post = Backbone.Model.extend({
    urlRoot: '/api/posts',
    defaults: {
      title: '',
      description: '',
      body: '',
      createdAt: '',
      modifiedAt: ''
    },
    parse: function (data) {
      data.createdAt = data.createdAt.date;
      data.modifiedAt = data.modifiedAt.date;
      return data;
    },
    validate: function (attrs, options) {
      var errors = {};
      if (!attrs.title) {
        errors.title = 'can\'t be blank';
      }
      if (!attrs.description) {
        errors.description = 'can\'t be blank';
      }
      else {
        if (attrs.description.length > 140) {
          errors.description = 'is too big';
        }
      }
      if (!_.isEmpty(errors)) {
        return errors;
      }
    }
  });

  var API={
    getPostEntity: function (postId) {
      var post = new Post({id: postId});
      var defer = $.Deferred();
      
      post.fetch({
        success: function (data) {
          defer.resolve(data);
        },
        error: function (data) {
          defer.resolve(undefined);
        }
      });
      
      return defer.promise();
    }
  };
  PostManager.reqres.setHandler('post:entity', function (id) { 
    return API.getPostEntity(id);
  });
  PostManager.reqres.setHandler('post:entity:new', function (id) { 
    return new Post();
  });
  
  return Post;
});