import Route from '@ember/routing/route';

export default Route.extend({
  setupController(controller) {
    controller.set('currentRoute', this);
  },

  actions: {
    openModal(modalName) {
      return this.render(modalName, {
        outlet: 'modal',
        into: 'application',
      });
    },

    closeModal() {
      var myDisplayName = document.getElementById('my-display-name').value;
      window.localStorage.setItem('myDisplayName', myDisplayName);
      return this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application',
      });
    },
  },
});
