/**
 * Created by lekskazimirchuk on 6/5/16.
 */
define([
  'jquery',
  'backbone',
  'management/app',
  'management/entities/post/model'
], function (
  $, 
  Backbone, 
  PostManager, 
  PostModel
) {
  var PostCollection = Backbone.Collection.extend({
    url: '/api/posts',
    model: PostModel
  });
  
  var API = {
    getPostEntities: function () {
      var posts = new PostCollection([]);
      var defer = $.Deferred();
      posts.fetch({
        success: function (data) {
          defer.resolve(data);
        },
        error: function (error) {
          if (0 === error.models.length) {
            defer.resolve([]);
          }
        }
      });
      
      return defer.promise();
    }
  };

  PostManager.reqres.setHandler('post:entities', function () {
    return API.getPostEntities();
  });

  return PostCollection;
});