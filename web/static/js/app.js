import "phoenix_html"

window.React = require("react");
window.ReactDOM = require("react-dom");
import {Router, Route, browserHistory} from 'react-router';
window.Dispatcher = require("./dispatcher");

window.AuthStore = require("./stores/auth-store");
window.AuthStore.connectSocket();

var HomePage = require("./react/pages/home-page");
var DashboardPage = require("./react/pages/dashboard-page");
var LoginPage = require("./react/pages/login-page");
var SignupPage = require("./react/pages/signup-page");
var NotFoundPage = require("./react/pages/not-found-page");

function ensureAuthenticated() {
  if(window.AuthStore.isLoggedIn() == false) {
    browserHistory.push("/login")
  }
}

function ensureNotAuthenticated() {
  if(window.AuthStore.isLoggedIn() == true) {
    browserHistory.push("/app")
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/login" component={LoginPage} onEnter={ensureNotAuthenticated}/>
    <Route path="/signup" component={SignupPage} onEnter={ensureNotAuthenticated}/>
    <Route path="/app" component={DashboardPage} onEnter={ensureAuthenticated}>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Router>
  , document.getElementById('react-component'));
