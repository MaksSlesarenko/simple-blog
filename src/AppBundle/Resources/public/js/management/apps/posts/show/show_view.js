/**
 * Created by lekskazimirchuk on 4/7/16.
 */
PostManager.module("PostsApp.Show", function (
  Show,
  PostManager,
  Backone,
  Marionette,
  $,
  _
) {
  Show.Post = Marionette.ItemView.extend({
    template: "#post-view"
  });

  Show.MissingPost = Marionette.ItemView.extend({
    template: "#missing-post-view"
  });
});