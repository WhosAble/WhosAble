var NavBar = React.createClass({
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

  openMenu() {
    console.log("opening menu");
  },

  handleLogout() {
    window.Dispatcher.logout();
  },

  renderLogo() {
    return(
      <li>
        <a href="/#">
          <img src="/images/logo.png" alt="WhosAble"/>
        </a>
      </li>
    );
  },

  renderMenuBtn() {
    return(
      <li>
        <a onClick={ this.openMenu }>
          <i className="fa fa-bars fa-2x"/>
        </a>
      </li>
    );
  },

  render() {
    if(this.state.isLoggedIn) {
      return(
        <ul id="nav-bar">
          { this.renderLogo() }
          <li><a href="javascript:;" onClick={ this.handleLogout }>Logout</a></li>
          <li><a href="/#/app">Dashboard</a></li>
          { this.renderMenuBtn() }
        </ul>
      );
    } else {
      return(
        <ul id="nav-bar">
          { this.renderLogo() }
          <li><a href="/#/signup">Signup</a></li>
          <li><a href="/#/login">Login</a></li>
          { this.renderMenuBtn() }
        </ul>
      );
    }
  }
});

module.exports = NavBar;
