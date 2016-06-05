define(['management/app', 'management/apps/posts/list/list_view'], function (PostManager, View) {
  PostManager.module('PostsApp.List', function (List, PostManager, Backbone, Marionette, $, _) {
    List.Controller = {
      listPosts: function () {
        require([
          'management/common/views',
          'management/entities/post/collection'
        ], function (CommonViews) {
          var loadingView = new CommonViews.Loading();
          PostManager.regions.main.show(loadingView);

          var fetchingPosts = PostManager.request('post:entities');

          var postsListLayout = new View.Layout();
          var postsListPanel = new View.Panel();
          
          $.when(fetchingPosts).done(function (posts) {
            var postsListView = new View.Posts({
              collection: posts
            });

            postsListLayout.on('show', function () {
              postsListLayout.panelRegion.show(postsListPanel);
              postsListLayout.postsRegion.show(postsListView);
            });

            postsListPanel.on('post:new', function () {
              require(['management/apps/posts/new/new_view'], function (NewView) {
                var newPost = PostManager.request('post:entity:new');

                var view = new NewView.Post({
                  model: newPost
                });

                view.on('form:submit', function (data) {
                  if(posts.length > 0){
                    var highestId = posts.max(function (c) { return c.id; }).get("id");
                    data.id = highestId + 1;
                  }
                  else{
                    data.id = 1;
                  }
                  if(newPost.save(data)){
                    posts.add(newPost);
                    view.trigger('dialog:close');
                    var newPostView = postsListView.children.findByModel(newPost);
                    // check whether the new post view is displayed 
                    if(newPostView){
                      newPostView.flash('success');
                    }
                  }
                  else{
                    view.triggerMethod('form:data:invalid', newPost.validationError);
                  }
                });

                PostManager.regions.dialog.show(view);
              });
            });

            postsListView.on('childview:post:show', function (childView, args) {
              PostManager.trigger('post:show', args.model.get('id'));
            });

            postsListView.on('childview:post:edit', function (childView, args) {
              require(['management/apps/posts/edit/edit_view'], function (EditView) {
                var model = args.model;
                var view = new EditView.Post({
                  model: model
                });

                view.on('form:submit', function (data) {
                  if (model.save(data)) {
                    childView.render();
                    view.trigger('dialog:close');
                    childView.flash('success');
                  } else {
                    view.triggerMethod("form:data:invalid", model.validationError);
                  }
                });

                PostManager.regions.dialog.show(view);
              });
            });

            postsListView.on('childview:post:delete', function (childView, args) {
              args.model.destroy();
            });

            PostManager.regions.main.show(postsListLayout);
          });
        });
      }
    }
  });

  return PostManager.PostsApp.List.Controller;
});