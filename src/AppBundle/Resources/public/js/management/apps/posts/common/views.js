/**
 * Created by lekskazimirchuk on 6/5/16.
 */
define([
  "management/app",
  "tpl!management/apps/posts/common/templates/form.tpl",
  "backbone.syphon"
], function(PostManager, formTpl) {
  PostManager.module("PostsApp.Common.Views", function (Views, PostManager, Backbone, Marionette, $, _) {
    Views.Form = Marionette.ItemView.extend({
      template: formTpl,

      events: {
        "click button.js-submit": "submitClicked"
      }
    });

    _.extend(Views.Form.prototype, {
      submitClicked: function (e) {
        e.preventDefault();
        var data = Backbone.Syphon.serialize(this);
        this.trigger("form:submit", data);
      },

      onFormDataInvalid: function (errors) {
        var $view = this.$el;

        var clearFormErrors = function () {
          var $form = $view.find("form");
          $form.find(".help-inline.error").each(function () {
            $(this).remove();
          });
          $form.find(".control-group.error").each(function () {
            $(this).removeClass("error");
          });
        };

        var markErrors = function (value, key) {
          var $controlGroup = $view.find("#post-" + key).parent();
          var $errorEl = $("<span>", {class: "help-inline error", text: value});
          $controlGroup.append($errorEl).addClass("error");
        };

        clearFormErrors();
        _.each(errors, markErrors);
      }
    });
  });
  return PostManager.PostsApp.Common.Views;
});