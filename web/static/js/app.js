import "phoenix_html"

window.React = require("react");
window.ReactDOM = require("react-dom");
window.Dispatcher = require("./dispatcher");

var Router = require("./react/router");
window.AuthStore = require("./stores/auth-store");
window.AuthStore.connectSocket();

// Split location into `/` separated parts, then render `Application` with it
function handleNewHash() {
  var hashLocation = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');
  var router = <Router location={hashLocation}/>;
  ReactDOM.render(router, document.getElementById('react-component'));
}

// Handle the initial route and browser navigation events
handleNewHash();
window.addEventListener('hashchange', handleNewHash, false);
