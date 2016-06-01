/**
 * Created by lekskazimirchuk on 4/3/16.
 */
PostManager.module("Entities", function (
    Entities,
    PostManager,
    Backbone,
    Marionette,
    $,
    _
) {
    Entities.Post = Backbone.Model.extend({
        urlRoot: "posts",
        defaults: {
            phoneNumber: "No phone number!"
        }
    });

    Entities.PostCollection = Backbone.Collection.extend({
        url: "posts",
        model: Entities.Post,
        localStorage: new Backbone.LocalStorage("post-list"),
        comparator: "firstName" //TODO: write custom comparator to compare lastNames too.
    });

    var posts;

    var initializePosts = function () {
        posts = new Entities.PostCollection([
            {
                id: 1,
                title: "Alicia"
            },
            {
                id: 2,
                title: "Patricia"
            },
            {
                id: 3,
                title: "Machina"
            },
            {
                id: 4,
                title: "Tom"
            },
            {
                id: 5,
                title: "Christian"
            }
        ]);

        posts.forEach(function (post) {
            post.save();
        });

        return posts;
    };

    var API = {
        getPostEntities: function () {
            var posts = new Entities.PostCollection();
            posts.fetch();
            if (0 === posts.length) {
                return initializePosts();
            }
            return posts;
        },
        getPostEntity: function(postId) {
            var post = new Entities.Post({id: postId});
            post.fetch();
            return post;
        }
    };

    PostManager.reqres.setHandler("post:entities", function () {
        return API.getPostEntities();
    });

    PostManager.reqres.setHandler("post:entity", function(id){
        return API.getPostEntity(id);
    });
});