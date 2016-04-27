import { browserHistory } from 'react-router';

var Dispatcher = {
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