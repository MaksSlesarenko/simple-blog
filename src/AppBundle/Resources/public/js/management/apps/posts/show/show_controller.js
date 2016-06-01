/**
 * Created by lekskazimirchuk on 4/7/16.
 */
PostManager.module("ContactsApp.Show", function (
  Show,
  PostManager,
  Backbone,
  Marionette,
  $,
  _
) {
  Show.Controller = {
    showPost: function (id) {
      var model = PostManager.request("post:entity", id);
        
      var postView;
    
      if (model !== undefined) {
        postView = new Show.Post({
          model: model
        });
      } else {
        postView = new Show.MissingPost();
      }
      
      PostManager.mainRegion.show(postView);
    }
  };
});