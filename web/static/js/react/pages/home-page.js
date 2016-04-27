var NavBar = require("../nav-bar");
var SignupForm = require("../forms/signup-form");

var HomePage = React.createClass({
  propTypes: {
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

  renderSignupForm() {
    if(!this.state.isLoggedIn) {
      return(<SignupForm/>);
    }
  },

  render() {
    return(
      <div>
        <NavBar isLoggedIn={ this.state.isLoggedIn }/>
        <div className="container">
          <main role="main">
            { this.renderSignupForm() }
          </main>
        </div>
      </div>
    );
  }
});

module.exports = HomePage;
