define(['management/app', 'management/apps/posts/show/show_view'], function (PostManager, View) {
  return {
    showPost: function (id) {
      require([
        'management/common/views', 
        'management/entities/post/model'
      ], function (CommonViews) {
        var loadingView = new CommonViews.Loading({
          title: 'Artificial Loading Delay',
          message: 'Data loading is delayed to demonstrate using a loading view.'
        });
        PostManager.regions.main.show(loadingView);

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