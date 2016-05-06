import { browserHistory } from 'react-router';

var Dispatcher = {
  createAddress(address, city, state, zip) {
    return window.AuthStore.channel.push("create_address", {address: address, city: city, state: state, zip: zip})
      /*.receive("ok", (resp) => {
      }).receive("error", (resp) => {
      });*/
  },

  createService(name) {
    return window.AuthStore.channel.push("create_service", {name: name})
    /*  .receive("ok", (resp) => {
      }).receive("error", (resp) => {
      });*/
  },

  createJob(service_id, address_id, start, end, notes) {
    return window.AuthStore.channel.push("create_job", {service_id: service_id, address_id: address_id, start: start, end: end, notes: notes})
      /*.receive("ok", (resp) => {
      }).receive("error", (resp) => {
      });*/
  },

  login(email, password) {
    return $.ajax({
      method: "POST",
      url: "/api/login",
      data: {email: email, password: password}
    }).done(function(response) {
      if(response["status"] == "success") {
        window.AuthStore.setSession(response);
        browserHistory.push("/app");
      }
    });
  },

  logout() {
    window.AuthStore.clearSession();
    browserHistory.push("/login");
  },

  signup(firstName, lastName, email, password) {
    return $.ajax({
      method: "POST",
      url: "/api/signup",
      data: {user: {first_name: firstName, last_name: lastName, email: email, password: password}}
    });
  }
};

module.exports = Dispatcher;