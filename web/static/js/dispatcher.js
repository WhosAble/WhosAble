var Dispatcher = {
  login(email, password) {
    return $.ajax({
      method: "POST",
      url: "/api/login",
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
      url: "/api/signup",
      data: {user: {first_name: firstName, last_name: lastName, email: email, password: password}}
    });
  }
};

module.exports = Dispatcher;