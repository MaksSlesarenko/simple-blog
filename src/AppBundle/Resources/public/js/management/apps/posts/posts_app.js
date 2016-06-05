/**
 * Created by lekskazimirchuk on 4/7/16.
 */
define(['management/app'], function (PostManager) {
  PostManager.module('PostsApp', function (
    PostsApp,
    PostManager,
    Backbone,
    Marionette,
    $,
    _
  ) {
    PostsApp.startWithParent = false;

    PostsApp.onStart = function () {
      console.log('starting PostsApp');
    };

    PostsApp.onStop = function () {
      console.log('stopping PostsApp');
    };
  });

  return PostManager.PostsApp;
});