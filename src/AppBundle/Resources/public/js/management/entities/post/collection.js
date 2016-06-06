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
          console.log(data);
          defer.resolve(data);
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