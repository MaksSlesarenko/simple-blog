/**
 * Created by lekskazimirchuk on 6/1/16.
 */
define(['marionette', 'bootstrap'], function (Marionette) {
  Marionette.Region.Dialog = Marionette.Region.extend({
    getModal: function () {
      return this.$el.find('#myModal');
    },
    onShow: function (view) {
      this.listenTo(view, 'dialog:close', this.closeDialog);
      var self = this;
      var modal = this.getModal();
      $(modal).modal({
        keyboard: false,
        backdrop: 'static',
        close: function () {
          self.closeDialog();
        }
      });
      $(modal).modal('show');
    },
    closeDialog: function (e) {
      var modal = this.getModal();
      this.stopListening();
      modal.modal('hide');
    } 
  });
  
  return Marionette.Region.Dialog; 
});