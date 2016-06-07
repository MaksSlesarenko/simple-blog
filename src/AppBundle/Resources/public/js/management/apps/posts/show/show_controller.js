define(['management/app', 'management/apps/posts/show/show_view'], function (PostManager, View) {
  return {
    showPost: function (id) {
      require([
        'management/common/views', 
        'management/entities/post/model'
      ], function (CommonViews) {
        PostManager.regions.main.show(new CommonViews.Loading({
          title: "Loading...",
          message: 'Please, wait!'
        }));
        var fetchingPost = PostManager.request('post:entity', id);
        $.when(fetchingPost).done(function (post) {
          var postView;
          if(post !== undefined){
            postView = new View.Post({
              model: post
            });

            postView.on('post:edit', function (post) {
              PostManager.trigger('post:edit', post.get('id'));
            });
          }
          else{
            postView = new View.MissingPost();
          }

          PostManager.regions.main.show(postView);
        });
      });
    }
  };
});