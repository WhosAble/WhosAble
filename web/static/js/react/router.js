var HomePage = require("./pages/home-page");
var DashboardPage = require("./pages/dashboard-page");
var LoginPage = require("./pages/login-page");
var SignupPage = require("./pages/signup-page");
var NotFoundPage = require("./pages/not-found-page");

var Router = React.createClass({
  PropTypes: {
    location: React.PropTypes.string.isRequired
  },

  getInitialState() {
    return {
      isLoggedIn: false
    };
  },

  componentDidMount() {
    window.AuthStore.subscribe(this.receiveState);
  },

  componentWillUnmount() {
    window.AuthStore.unsubscribe(this.receiveState);
  },

  receiveState(isLoggedIn, userID, accountID) {
    this.setState({
      isLoggedIn: isLoggedIn
    });
  },

  render() {
    var isLoggedIn = this.state.isLoggedIn;

    switch (this.props.location[0])  {
    case '':
      return(<HomePage/>);
    case "app":
      if(isLoggedIn) {
        return(<DashboardPage/>);
      } else {
        window.location = "/#/login";
      }
    case "login":
      if(isLoggedIn) {
        window.location = "/#/app";
      } else {
        return(<LoginPage/>);
      }
    case "signup":
      if(isLoggedIn) {
        window.location = "/#/app";
      } else {
        return(<SignupPage/>);
      }
    default:
      return(<NotFoundPage/>);
    }
  }
});

module.exports = Router;
