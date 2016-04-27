var NavBar = require("../nav-bar");
var LoginForm = require("../forms/login-form");

var LoginPage = React.createClass({
  propTypes: {
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <LoginForm/>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
