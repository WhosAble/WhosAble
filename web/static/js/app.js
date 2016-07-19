import "phoenix_html"

window.React = require("react");
window.ReactDOM = require("react-dom");
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
window.Dispatcher = require("./dispatcher");

window.AuthStore = require("./stores/auth-store");
window.ServiceStore = require("./stores/service-store");
window.AddressStore = require("./stores/addresses-store");
window.ContactsStore = require("./stores/contacts-store");
window.JobsStore = require("./stores/jobs-store");
window.AuthStore.connectSocket();

var ConnectionStatus = require("./react/pages/connection-status");
var HomePage = require("./react/pages/home-page");
var LoginPage = require("./react/pages/login-page");
var SignupPage = require("./react/pages/signup-page");
var DashboardPage = require("./react/pages/dashboard-page");
var NewContactPage = require("./react/pages/new-contact-page");
var ContactsPage = require("./react/pages/contacts-page");
var NewJobPage = require("./react/pages/new-job-page");
var JobsPage = require("./react/pages/jobs-page");
var NotFoundPage = require("./react/pages/not-found-page");
var Secure = require("./react/pages/secure");
var Connect = require("./react/pages/connect");
var Affordable = require("./react/pages/affordable");
var LocationsPage = require("./react/pages/locations-page");
var NewLocationsPage = require("./react/pages/new-locations-page");
var ServicesPage = require("./react/pages/services-page");
var NewServicePage = require("./react/pages/new-service-page");


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
    <Route path="/affordable" component={Affordable}/>
    <Route path="/connect" component={Connect}/>
    <Route path="/secure" component={Secure}/>
    <Route path="/login" component={LoginPage} onEnter={ensureNotAuthenticated}/>
    <Route path="/signup" component={SignupPage} onEnter={ensureNotAuthenticated}/>
    <Route path="/app" component={ConnectionStatus} onEnter={ensureAuthenticated}>
      <IndexRoute component={DashboardPage}/>
      <Route path="contacts" component={ContactsPage}/>
      <Route path="contacts/new" component={NewContactPage}/>
      <Route path="contacts/new/services/:serviceID" component={NewContactPage}/>
      <Route path="jobs" component={JobsPage}/>
      <Route path="jobs/new" component={NewJobPage}/>
      <Route path="locations" component={LocationsPage}/>
      <Route path="locations/new" component={NewLocationsPage}/>
      <Route path="services" component={ServicesPage}/>
      <Route path="services/new" component={NewServicePage}/>
    </Route>
    <Route path="*" component={NotFoundPage}/>
  </Router>
  , document.getElementById('react-component'));
