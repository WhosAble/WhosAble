import {Link} from 'react-router'

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
        <Link to="/">
          <img src="/images/logo.png" alt="WhosAble"/>
        </Link>
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
          <li>
            <Link to="/app">Dashboard</Link>
          </li>
          { this.renderMenuBtn() }
        </ul>
      );
    } else {
      return(
        <ul id="nav-bar">
          { this.renderLogo() }
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          { this.renderMenuBtn() }
        </ul>
      );
    }
  }
});

module.exports = NavBar;
