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
            <div className="row">
              <div className="col-xs-12 col-md-3"></div>
              <div className="col-xs-12 col-md-6">
                <LoginForm/>
                <Link to="/signup">
                  <i className="fa fa-user-plus"/>Signup
                </Link>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = LoginPage;
