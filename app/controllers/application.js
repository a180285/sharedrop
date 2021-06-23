import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { v4 as uuidv4 } from 'uuid';

import User from '../models/user';

export default Controller.extend({
  avatarService: service('avatar'),

  init(...args) {
    this._super(args);

    const id = window.Sharedrop.userId;
    const ip = window.Sharedrop.publicIp;
    const avatar = this.avatarService.get();

    const myDisplayName = window.localStorage.getItem('myDisplayName');

    const you = User.create({
      uuid: id,
      public_ip: ip,
      avatarUrl: avatar.url,
      label: myDisplayName || avatar.label,
    });
    console.log(`you : ${avatar.label}`);
    you.set('peer.id', id);
    this.set('you', you);
  },

  actions: {
    redirect() {
      const uuid = uuidv4();
      const key = `show-instructions-for-room-${uuid}`;

      sessionStorage.setItem(key, 'yup');
      this.transitionToRoute('room', uuid);
    },
  },
});
