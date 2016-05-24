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

  receiveState(authState) {
    this.setState({
      isLoggedIn: authState.isLoggedIn
    });
  },

  openMenu() {
    this.setState({menuOpen: !this.state.menuOpen});
  },

  handleLogout() {
    window.Dispatcher.logout();
  },

  renderLogo() {
    return(
      <li className="logo-li">
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
      <li className="menu-btn-li">
      <div className="hidden-md hidden-lg hidden-xl visible-sm visible-xs">
        <div id="menu-btn" className={ menuClass } onClick={ this.openMenu }>

          <span></span>
          <span></span>
          <span></span>
          <span></span>
          </div>
        </div>
      </li>
    );
  },

renderDesktopMenu() {

  var menuClass = "";
  if(this.state.isLoggedIn) { menuClass += " app-menu"; }
  if(this.state.isLoggedIn) {
    return(
      <li>
      <ul className="hidden-sm hidden-xs visible-xl visible-lg visible-md">
        <li>
          <Link to="/app">
            <i className="fa fa-tachometer fa-fw"/>Dashboard
          </Link>
        </li>
        <li>
          <Link to="/app/jobs">
            <i className="fa fa-briefcase fa-fw"/>Jobs
          </Link>
        </li>
        <li>
          <Link to="/app/contacts">
            <i className="fa fa-users fa-fw"/>Contacts
          </Link>
        </li>
        <li>
        <Link to="/locations">
          <i className="fa fa-location-arrow fa-fw"/>Locations
          </Link>
          </li>
        <li>
          <a href="javascript:;" onClick={ this.handleLogout }>
            <i className="fa fa-sign-out fa-fw"/>Logout
          </a>
        </li>
      </ul>
      </li>
      );
      } else {
      return(
        <li>
      <ul className="hidden-sm hidden-xs visible-xl visible-lg visible-md">
      <li>
        <Link to="/login">
          <i className="fa fa-sign-in fa-fw"/>Login
        </Link>
      </li>
        <li>
          <Link to="/signup">
            <i className="fa fa-user-plus fa-fw"/>Signup
          </Link>
        </li>
      </ul>
      </li>
      );
      }
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
              <i className="fa fa-tachometer fa-fw"/>Dashboard
            </Link>
          </li>
          <li>
            <Link to="/app/jobs">
              <i className="fa fa-briefcase fa-fw"/>Jobs
            </Link>
          </li>
          <li>
            <Link to="/app/contacts">
              <i className="fa fa-users fa-fw"/>Contacts
            </Link>
          </li>
          <li>
          <Link to="/locations">
            <i className="fa fa-location-arrow fa-fw"/>Locations
            </Link>
            </li>
          <li>
            <a href="javascript:;" onClick={ this.handleLogout }>
              <i className="fa fa-sign-out fa-fw"/>Logout
            </a>
          </li>
        </ul>
      );
    } else {
      return(

        <ul id="menu" className={ menuClass }>
          <li>
            <Link to="/signup">
              <i className="fa fa-user-plus fa-fw"/>Signup
            </Link>
          </li>
          <li>
            <Link to="/login">
              <i className="fa fa-sign-in fa-fw"/>Login
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
          { this.renderDesktopMenu() }
          { this.renderMenuBtn() }

        </ul>
        { this.renderMenu() }

      </div>
    );
  }
});

module.exports = NavBar;
