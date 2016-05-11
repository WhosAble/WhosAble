import { browserHistory } from 'react-router';

var Dispatcher = {
  createAddress(address, city, state, zip) {
    return window.AuthStore.channel.push("create_address", {address: address, city: city, state: state, zip: zip})
  },

  createJob(service_id, address_id, start, end, notes) {
    return window.AuthStore.channel.push("create_job", {service_id: service_id, address_id: address_id, start: start, end: end, notes: notes})
  },

  createContact(contact) {
    return window.AuthStore.channel.push("create_contact", contact);
  },

  createLocation(location) {
    return window.AuthStore.channel.push("create_address", location);
  },

  createService(name) {
    return window.AuthStore.channel.push("create_service", {name: name})
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