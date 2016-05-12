import {Socket} from "phoenix"
import _ from "lodash";

module.exports = {
  contacts: {},
  callBacks: [],

  subscribe(callBack) {
    window.ContactsStore.connectToChannel();
    window.ContactsStore.callBacks.push(callBack);
    window.ContactsStore.sendCallBack(callBack);
  },

  unsubscribe(callBack) {
    var i = window.ContactsStore.callBacks.indexOf(callBack);
    if(i != -1) {
      window.ContactsStore.callBacks.splice(i, 1);
    }
  },

  sendCallBacks() {
    window.ContactsStore.callBacks.forEach(function (callBack) {
      if(callBack && typeof(callBack) === "function") {
        window.ContactsStore.sendCallBack(callBack);
      }
    });
  },

  sendCallBack(callBack) {
    callBack(_.values(window.ContactsStore.contacts));
  },

  addNewContact(contact) {
    window.ContactsStore.contacts[contact.id] = contact;
    window.ContactsStore.sendCallBacks();
  },

  refreshContacts(contacts) {
    var newContact = {};
    contacts.forEach(function (contact) {
      newContact[contact.id] = contact;
    });
    window.ContactsStore.contacts = newContact;
    window.ContactsStore.sendCallBacks();
  },

  connectToChannel() {
    if(window.AuthStore.isLoggedIn() && window.AuthStore.channel && Object.keys(window.ContactsStore.contacts).length === 0) {
      window.AuthStore.channel.on("new_contact", (contact) => {
        window.ContactsStore.addNewContact(contact);
      })
      window.AuthStore.channel.on("all_contacts", (response) => {
        window.ContactsStore.refreshContacts(response.contacts);
      });
      window.AuthStore.channel.push("request_contacts", {});
    }
  }
};
