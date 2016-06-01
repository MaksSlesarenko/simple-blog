/**
 * Created by lekskazimirchuk on 4/3/16.
 */
ContactManager.module("ContactsApp.List", function (
    List,
    ContactManager,
    Backbone,
    Marionette,
    $,
    _
) {
    List.Contact = Marionette.ItemView.extend({
        template: "#contact-list-item",
        tagName: "tr",

        events: {
            "click": "highlightName",
            "click button.js-delete": "deleteClicked",
            "click td a.js-show": "showClicked"
        },

        highlightName: function () {
            this.$el.toggleClass("warning");
        },
        deleteClicked: function (event) {
            event.stopPropagation();
            this.trigger("contact:delete", this.model);
        },
        showClicked: function (event) {
            event.preventDefault();
            event.stopPropagation();
            this.trigger("contact:show", this.model);
        },

        //lifecycle events
        remove: function () {
            var self = this;
            this.$el.fadeOut(function () {
                Marionette.ItemView.prototype.remove.call(self);
            });
        }
    });

    List.Contacts = Marionette.CompositeView.extend({
        tagName: "table",
        className: "table table-hover",
        template: "#contact-list",
        childView: List.Contact,
        childViewContainer: "tbody",

        //Magic method that is called by Marionette after the event has been triggered
        // onChildviewContactDelete: function () {
        //     this.$el.fadeOut(1000, function () {
        //         $(this).fadeIn(1000);
        //     })
        // }
    });
});