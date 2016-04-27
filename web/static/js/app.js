import "phoenix_html"

window.React = require("react");
window.ReactDOM = require("react-dom");
import {Router, Route, browserHistory} from 'react-router';
window.Dispatcher = require("./dispatcher");

window.AuthStore = require("./stores/auth-store");
window.AuthStore.connectSocket();

var HomePage = require("./react/pages/home-page");
var LoginPage = require("./react/pages/login-page");
var SignupPage = require("./react/pages/signup-page");
var DashboardPage = require("./react/pages/dashboard-page");
var JobsPage = require("./react/pages/jobs-page");
var NotFoundPage = require("./react/pages/not-found-page");

function ensureAuthenticated() {
  if(window.AuthStore.isLoggedIn() == false) {
    setTimeout(function() {
      browserHistory.push("/login")
    }, 100);
  }
}

function ensureNotAuthenticated() {
  if(window.AuthStore.isLoggedIn() == true) {
    setTimeout(function() {
      browserHistory.push("/app")
    }, 100);
  }
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={HomePage}/>
    <Route path="/login" component={LoginPage} onEnter={ensureNotAuthenticated}/>
    <Route path="/signup" component={SignupPage} onEnter={ensureNotAuthenticated}/>
    <Route path="/app" component={DashboardPage} onEnter={ensureAuthenticated}>
      <Route path="jobs" component={JobsPage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Router>
  , document.getElementById('react-component'));
