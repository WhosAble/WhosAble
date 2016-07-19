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
            <div className="row">
              <div className="col-xs-12 col-md-3"></div>
              <div className="col-xs-12 col-md-6">
                <SignupForm/>
                <div>
                  <Link to="/login">
                    <i className="fa fa-sign-in"/>Login
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
});

module.exports = SignupPage;
