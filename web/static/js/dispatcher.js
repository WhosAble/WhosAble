import { browserHistory } from 'react-router';

var Dispatcher = {
  createService(name) {
    return window.AuthStore.channel.push("create_service", {name: name})
    /*  .receive("ok", (resp) => {
      }).receive("error", (resp) => {
      });*/
  },

  createAddress(address, city, state, zip) {
    return window.AuthStore.channel.push("create_address", {address: address, city: city, state: state, zip: zip})
      .receive("ok", (resp) => {
        console.log("OKAY");
        console.log(resp);
      }).receive("error", (resp) => {
        console.log("ERROR");
        console.log(resp);
      });
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