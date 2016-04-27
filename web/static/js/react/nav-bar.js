import {Link} from 'react-router'

var NavBar = React.createClass({
  propTypes: {
  },

  getInitialState() {
    return {
      isLoggedIn: false,
      menuOpen: false
    };
  },

  componentDidMount() {
    window.AuthStore.subscribe(this.receiveState);
  },

  componentWillUnmount() {
    window.AuthStore.unsubscribe(this.receiveState);
  },

  receiveState(isLoggedIn, userID, accountID) {
    this.setState({isLoggedIn: isLoggedIn});
  },

  openMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
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
    var menuClass = "";
    if(this.state.menuOpen) { menuClass = "open"; }

    return(
      <li>
        <div id="menu-btn" className={ menuClass } onClick={ this.openMenu }>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </li>
    );
  },

  renderMenu() {
    var menuClass = "";
    if(this.state.menuOpen) { menuClass = "open"; }
    if(this.state.isLoggedIn) { menuClass += " app-menu"; }

    if(this.state.isLoggedIn) {
      return(
        <ul id="menu" className={ menuClass }>
          <li>
            <Link to="/app">
              <i className="fa fa-tachometer"/>Dashboard
            </Link>
          </li>
          <li>
            <Link to="/app/jobs">
              <i className="fa fa-briefcase"/>Jobs
            </Link>
          </li>
          <li>
            <Link to="/app/contacts">
              <i className="fa fa-users"/>Contacts
            </Link>
          </li>
          <li>
            <a href="javascript:;" onClick={ this.handleLogout }>
              <i className="fa fa-sign-out"/>Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return(
        <ul id="menu" className={ menuClass }>
          <li>
            <Link to="/signup">
              <i className="fa fa-plus"/>Signup
            </Link>
          </li>
          <li>
            <Link to="/login">
              <i className="fa fa-sign-in"/>Login
            </Link>
          </li>
        </ul>
      );
    }
  },

  render() {
    return(
      <div id="nav-bar">
        <ul id="nav-bar-items">
          { this.renderLogo() }
          { this.renderMenuBtn() }
        </ul>
        { this.renderMenu() }
      </div>
    );
  }
});

module.exports = NavBar;
