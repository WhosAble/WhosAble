var Dispatcher = {
  login(email, password) {
    return $.ajax({
      method: "POST",
      url: window.API_URL + "/login",
      data: {email: email, password: password}
    }).done(function(response) {
      if(response["status"] == "success") {
        window.AuthStore.setSession(response);
      }
    });
  },

  logout() {
    window.AuthStore.clearSession();
  },

  signup(firstName, lastName, email, password) {
    return $.ajax({
      method: "POST",
      url: window.API_URL + "/signup",
      data: {user: {first_name: firstName, last_name: lastName, email: email, password: password}}
    }).done(function(response) {
      if(response["status"] == "success") {
        login(email, password);
      }
    });
  }
};

module.exports = Dispatcher;