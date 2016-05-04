import {Link} from 'react-router'
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
          <div>
        <Link to="/signup">
          <i className="fa fa-plus"/>Signup
        </Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
