import {Link} from 'react-router'
var NavBar = require("../nav-bar");
var SignupForm = require("../forms/signup-form");

var SignupPage = React.createClass({
  propTypes: {
  },

  render() {
    return(
      <div>
        <NavBar/>
        <div className="container">
          <main role="main">
            <SignupForm/>
          </main>
          <div>
          <Link to="/login">
            <i className="fa fa-sign-in"/>Login
          </Link>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SignupPage;
