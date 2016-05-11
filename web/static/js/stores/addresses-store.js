import {Socket} from "phoenix"
import _ from "lodash";

module.exports = {
  addresses: {},
  callBacks: [],

  subscribe(callBack) {
    window.AddressStore.connectToChannel();
    window.AddressStore.callBacks.push(callBack);
    window.AddressStore.sendCallBack(callBack);
  },

  unsubscribe(callBack) {
    var i = window.AddressStore.callBacks.indexOf(callBack);
    if(i != -1) {
      window.AddressStore.callBacks.splice(i, 1);
    }
  },

  sendCallBacks() {
    window.AddressStore.callBacks.forEach(function (callBack) {
      if(callBack && typeof(callBack) === "function") {
        window.AddressStore.sendCallBack(callBack);
      }
    });
  },

  sendCallBack(callBack) {
    callBack(_.values(window.AddressStore.addresses));
  },

  addNewAddress(address) {
    window.AddressStore.addresses[address.id] = address;
    window.AddressStore.sendCallBacks();
  },

  refreshAddress(addresses) {
    var newAddress = {};
    addresses.forEach(function (address) {
      newAddress[address.id] = address;
    });
    window.AddressStore.addresses = newAddress;
    window.AddressStore.sendCallBacks();
  },

  connectToChannel() {
    if(window.AuthStore.isLoggedIn() && window.AuthStore.channel && Object.keys(window.AddressStore.addresses).length === 0) {
      window.AuthStore.channel.on("new_address", (address) => {
        window.AddressStore.addNewAddress(address);
      })
      window.AuthStore.channel.on("all_addresses", (response) => {
        window.AddressStore.refreshAddress(response.addresses);
      });
      window.AuthStore.channel.push("request_addresses", {});
    }
  }
};
