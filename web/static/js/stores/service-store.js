import {Socket} from "phoenix"
import _ from "lodash";

module.exports = {
  services: {},
  callBacks: [],

  subscribe(callBack) {
    window.ServiceStore.connectToChannel();
    window.ServiceStore.callBacks.push(callBack);
    window.ServiceStore.sendCallBack(callBack);
  },

  unsubscribe(callBack) {
    var i = window.ServiceStore.callBacks.indexOf(callBack);
    if(i != -1) {
      window.ServiceStore.callBacks.splice(i, 1);
    }
  },

  sendCallBacks() {
    window.ServiceStore.callBacks.forEach(function (callBack) {
      if(callBack && typeof(callBack) === "function") {
        window.ServiceStore.sendCallBack(callBack);
      }
    });
  },

  sendCallBack(callBack) {
    callBack(_.values(window.ServiceStore.services));
  },

  addNewService(service) {
    window.ServiceStore.services[service.id] = service;
    window.ServiceStore.sendCallBacks();
  },

  refreshServices(services) {
    var newServices = {};
    services.forEach(function (service) {
      newServices[service.id] = service;
    });
    window.ServiceStore.services = newServices;
    window.ServiceStore.sendCallBacks();
  },

  connectToChannel() {
    if(window.AuthStore.isLoggedIn() && window.AuthStore.channel && Object.keys(window.ServiceStore.services).length === 0) {
      window.AuthStore.channel.on("new_service", (service) => {
        window.ServiceStore.addNewService(service);
      })
      window.AuthStore.channel.on("all_services", (response) => {
        window.ServiceStore.refreshServices(response.services);
      });
      window.AuthStore.channel.push("request_services", {});
    }
  }
};
