/**
 * Created by lekskazimirchuk on 6/5/16.
 */
define([
  "jquery",
  "backbone",
  "management/app",
  "management/entities/post/model",
  "management/apps/config/storage/localstorage"
], function ($, Backbone, PostManager, PostModel, configureStorage) {
  var PostCollection = Backbone.Collection.extend({
    url: "posts",
    model: PostModel,
    comparator: "title"
  });
  configureStorage(PostCollection);
  var initializePosts = function () {
    var posts = new PostCollection([
      {
        id: 1,
        title: "Key 1",
        description: "Khaled is being clear with you, appreciate it!",
        body: "Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Find peace, life is like a water fall, you’ve gotta flow. I’m up to something. The first of the month is coming, we have to get money, we have no choice. It cost money to eat and they don’t want you to eat. Major key, don’t fall for the trap, stay focused. It’s the ones closest to you that want to see you fail."
      },
      {
        id: 2,
        title: "Key 2",
        description: "This is the major one!",
        body: "Wraith talk. Wraith talk. Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise. The key to more success is to have a lot of pillows. Egg whites, turkey sausage, wheat toast, water. Of course they don’t want us to eat our breakfast, so we are going to enjoy our breakfast. Wraith talk. Look at the sunset, life is amazing, life is beautiful, life is what you make it. Give thanks to the most high.The key is to drink coconut, fresh coconut, trust me. They will try to close the door on you, just open it. The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion! You see that bamboo behind me though, you see that bamboo? Ain’t nothin’ like bamboo. Bless up. Let me be clear, you have to make it through the jungle to make it to paradise, that’s the key, Lion! Let’s see what Chef Dee got that they don’t want us to eat. Another one."
      },
      {
        id: 3,
        title: "Key 3",
        description: "About learning!",
        body: "Learning is cool, but knowing is better, and I know the key to success. The key to success is to keep your head above the water, never give up. You see the hedges, how I got it shaped up? It’s important to shape up your hedges, it’s like getting a haircut, stay fresh. Look at the sunset, life is amazing, life is beautiful, life is what you make it. You do know, you do know that they don’t want you to have lunch. I’m keeping it real with you, so what you going do is have lunch.Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise. The key to more success is to have a lot of pillows. You see that bamboo behind me though, you see that bamboo? Ain’t nothin’ like bamboo. Bless up. How’s business? Boomin. The key to success is to keep your head above the water, never give up. Celebrate success right, the only way, apple. They don’t want us to win. Bless up. You smart, you loyal, you a genius.Let’s see what Chef Dee got that they don’t want us to eat. Life is what you make it, so let’s make it. Always remember in the jungle there’s a lot of they in there, after you overcome they, you will make it to paradise. It’s important to use cocoa butter. It’s the key to more success, why not live smooth? Why live rough? Congratulations, you played yourself. Major key, don’t fall for the trap, stay focused. It’s the ones closest to you that want to see you fail. A major key, never panic. Don’t panic, when it gets crazy and rough, don’t panic, stay calm."
      }
    ]);
    posts.forEach(function (post) {
      post.save();
    });
    return posts.models;
  };
  var API = {
    getPostEntities: function () {
      var posts = new PostCollection();
      var defer = $.Deferred();
      posts.fetch({
        success: function (data) {
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function (fetchedPosts) {
        if (fetchedPosts.length === 0) {
          // if we don't have any posts yet, create some for convenience
          var models = initializePosts();
          posts.reset(models);
        }
      });
      return promise;
    }
  };

  PostManager.reqres.setHandler("post:entities", function () {
    return API.getPostEntities();
  });

  return PostCollection;
});