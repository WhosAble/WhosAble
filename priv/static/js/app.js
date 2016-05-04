(function() {
  'use strict';

  var globals = typeof window === 'undefined' ? global : window;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = ({}).hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = null;
    hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("web/static/js/app.js", function(exports, require, module) {
"use strict";

require("phoenix_html");

var _reactRouter = require("react-router");

window.React = require("react");
window.ReactDOM = require("react-dom");

window.Dispatcher = require("./dispatcher");

window.AuthStore = require("./stores/auth-store");
window.ServiceStore = require("./stores/service-store");
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

function ensureAuthenticated() {
  if (window.AuthStore.isLoggedIn() == false) {
    setTimeout(function () {
      _reactRouter.browserHistory.push("/login");
    }, 100);
  }
}

function ensureNotAuthenticated() {
  if (window.AuthStore.isLoggedIn() == true) {
    setTimeout(function () {
      _reactRouter.browserHistory.push("/app");
    }, 100);
  }
}

ReactDOM.render(React.createElement(
  _reactRouter.Router,
  { history: _reactRouter.browserHistory },
  React.createElement(_reactRouter.Route, { path: "/", component: HomePage }),
  React.createElement(_reactRouter.Route, { path: "/login", component: LoginPage, onEnter: ensureNotAuthenticated }),
  React.createElement(_reactRouter.Route, { path: "/signup", component: SignupPage, onEnter: ensureNotAuthenticated }),
  React.createElement(
    _reactRouter.Route,
    { path: "/app", component: ConnectionStatus, onEnter: ensureAuthenticated },
    React.createElement(_reactRouter.IndexRoute, { component: DashboardPage }),
    React.createElement(_reactRouter.Route, { path: "contacts", component: ContactsPage }),
    React.createElement(_reactRouter.Route, { path: "contacts/new", component: NewContactPage }),
    React.createElement(_reactRouter.Route, { path: "jobs", component: JobsPage }),
    React.createElement(_reactRouter.Route, { path: "jobs/new", component: NewJobPage })
  ),
  React.createElement(_reactRouter.Route, { path: "*", component: NotFoundPage })
), document.getElementById('react-component'));
});

require.register("web/static/js/dispatcher.js", function(exports, require, module) {
"use strict";

var _reactRouter = require("react-router");

var Dispatcher = {
  createService: function createService(name) {
    return window.AuthStore.channel.push("create_service", { name: name });
    /*  .receive("ok", (resp) => {
      }).receive("error", (resp) => {
      });*/
  },
  login: function login(email, password) {
    return $.ajax({
      method: "POST",
      url: "/api/login",
      data: { email: email, password: password }
    }).done(function (response) {
      if (response["status"] == "success") {
        window.AuthStore.setSession(response);
        _reactRouter.browserHistory.push("/app");
      }
    });
  },
  logout: function logout() {
    window.AuthStore.clearSession();
    _reactRouter.browserHistory.push("/login");
  },
  signup: function signup(firstName, lastName, email, password) {
    return $.ajax({
      method: "POST",
      url: "/api/signup",
      data: { user: { first_name: firstName, last_name: lastName, email: email, password: password } }
    });
  }
};

module.exports = Dispatcher;
});

require.register("web/static/js/react/create-btn.js", function(exports, require, module) {
"use strict";

var CreateBtn = React.createClass({
  displayName: "CreateBtn",

  propTypes: {
    title: React.PropTypes.string.isRequired,
    onCreate: React.PropTypes.func.isRequired
  },

  render: function render() {
    return React.createElement(
      "div",
      { id: "createbutton", onClick: this.props.onCreate },
      React.createElement("i", { className: "fa fa-plus" }),
      React.createElement(
        "div",
        { id: "button-label" },
        this.props.title
      )
    );
  }
});

module.exports = CreateBtn;
});

require.register("web/static/js/react/forms/job-form.js", function(exports, require, module) {
"use strict";

var JobForm = React.createClass({
  displayName: "JobForm",
  getInitialState: function getInitialState() {
    return {
      email: null,
      password: null,
      errors: []
    };
  },
  handleFieldChange: function handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },
  parseErrors: function parseErrors(field) {
    if (this.state.errors.length == 0) {
      return [];
    }

    return this.state.errors.map(function (error) {
      if (error.field == field) {
        return error;
      }
    });
  },
  render: function render() {
    return React.createElement(
      "form",
      { id: "JobForm" },
      "Describe the job:",
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "btn btn-primary", onClick: this.props.onformchange },
        "Service Type"
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "textarea",
        { name: "startlocation", rows: "4", cols: "20" },
        "Start Location"
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      "Start Date:",
      React.createElement("input", { type: "date", name: "startdate" }),
      "End Date:",
      React.createElement("input", { type: "date", name: "enddate" }),
      React.createElement("br", null),
      React.createElement("br", null),
      "Select a start time:",
      React.createElement("input", { type: "time", name: "usr_time" }),
      "Select an end time:",
      React.createElement("input", { type: "time", name: "usr_time" }),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "textarea",
        { name: "message", rows: "15", cols: "40" },
        "Notes:"
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement("input", { type: "submit", value: "Submit" })
    );
  }
});

module.exports = JobForm;
});

require.register("web/static/js/react/forms/jobtype.js", function(exports, require, module) {
"use strict";

var TextField = require("./text-field");
var JobType = React.createClass({
  displayName: "JobType",
  getInitialState: function getInitialState() {
    return {
      servicetype: null,
      errors: []
    };
  },
  handleCreate: function handleCreate() {
    var _this = this;

    window.Dispatcher.createService(this.state.servicetype).receive("ok", function (resp) {
      _this.setState({ serviceID: resp.service_id });
    }).receive("error", function (resp) {
      _this.setState({ errors: resp.errors });
    });
    this.props.onformchange();
  },
  handleFieldChange: function handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },
  parseErrors: function parseErrors(field) {
    if (this.state.errors.length == 0) {
      return [];
    }

    return this.state.errors.map(function (error) {
      if (error.field == field) {
        return error;
      }
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      "Service Type:",
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "form",
        null,
        React.createElement(TextField, { label: "servicetype", value: this.state.servicetype, errors: this.parseErrors("servicetype"), onChange: this.handleFieldChange.bind(this, "servicetype") })
      ),
      React.createElement("br", null),
      React.createElement("br", null),
      React.createElement(
        "div",
        { className: "btn btn-primary", onClick: this.handleCreate },
        "Submit Service Type"
      )
    );
  }
});

module.exports = JobType;
});

require.register("web/static/js/react/forms/login-form.js", function(exports, require, module) {
"use strict";

var PasswordField = require("./password-field");
var TextField = require("./text-field");
var LoadingEllipsis = require("../loading-ellipsis");

var LoginForm = React.createClass({
  displayName: "LoginForm",
  getInitialState: function getInitialState() {
    return {
      email: null,
      password: null,
      errors: [],
      loading: false
    };
  },
  handleFieldChange: function handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },
  login: function login(e) {
    e.preventDefault();
    var self = this;
    if (this.state.loading == false) {
      this.setState({ loading: true });

      var response = window.Dispatcher.login(this.state.email, this.state.password).done(function (response) {
        if (response.status == "failure") {
          self.setState({ loading: false, errors: [{ message: "Authentication failed!", field: "password" }] });
        }
      }).error(function () {
        self.setState({ loading: false, errors: [{ message: "Authentication failed!", field: "password" }] });
      });
    }
  },
  parseErrors: function parseErrors(field) {
    if (this.state.errors.length == 0) {
      return [];
    }

    return this.state.errors.map(function (error) {
      if (error.field == field) {
        return error;
      }
    });
  },
  renderBtn: function renderBtn() {
    if (this.state.loading) {
      return React.createElement(
        "button",
        { type: "submit", className: "btn" },
        React.createElement(
          LoadingEllipsis,
          null,
          "Logging In"
        )
      );
    } else {
      return React.createElement(
        "button",
        { type: "submit", className: "btn btn-primary", onClick: this.login },
        "Login"
      );
    }
  },
  render: function render() {
    return React.createElement(
      "form",
      { onSubmit: this.login },
      React.createElement(
        "h1",
        null,
        "Login Form"
      ),
      React.createElement(TextField, { label: "Email", value: this.state.email, errors: this.parseErrors("email"), onChange: this.handleFieldChange.bind(this, "email") }),
      React.createElement(PasswordField, { label: "Password", value: this.state.password, errors: this.parseErrors("password"), onChange: this.handleFieldChange.bind(this, "password") }),
      this.renderBtn()
    );
  }
});

module.exports = LoginForm;
});

require.register("web/static/js/react/forms/password-field.js", function(exports, require, module) {
"use strict";

var TextField = React.createClass({
  displayName: "TextField",

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    errors: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange: function handleChange(e) {
    this.props.onChange(e.target.value);
  },
  renderErrors: function renderErrors() {
    if (this.props.errors) {
      return this.props.errors.map(function (error, index) {
        if (typeof error != "undefined") {
          return React.createElement(
            "div",
            { key: index, className: "error" },
            error.message
          );
        }
      });
    }
  },
  render: function render() {

    return React.createElement(
      "div",
      { className: "form-group" },
      React.createElement(
        "label",
        { className: "control-label" },
        this.props.label
      ),
      React.createElement("input", { type: "password", className: "form-control", value: this.props.value, onChange: this.handleChange }),
      React.createElement(
        "div",
        { className: "errors" },
        this.renderErrors()
      )
    );
  }
});

module.exports = TextField;
});

require.register("web/static/js/react/forms/signup-form.js", function(exports, require, module) {
"use strict";

var PasswordField = require("./password-field");
var TextField = require("./text-field");
var LoadingEllipsis = require("../loading-ellipsis");

var SignupForm = React.createClass({
  displayName: "SignupForm",
  getInitialState: function getInitialState() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      errors: [],
      loading: false
    };
  },
  handleFieldChange: function handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },
  parseErrors: function parseErrors(field) {
    if (this.state.errors.length == 0) {
      return [];
    }

    return this.state.errors.map(function (error) {
      if (error.field == field) {
        return error;
      }
    });
  },
  signup: function signup(e) {
    e.preventDefault();
    var self = this;

    if (this.state.loading == false) {
      this.setState({ loading: true });

      if (this.state.password == this.state.confirmPassword) {
        var response = window.Dispatcher.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.password).done(function (response) {
          if (response.status == "failure") {
            self.setState({ loading: false, errors: response.errors });
          } else if (response["status"] == "success") {
            window.Dispatcher.login(self.state.email, self.state.password);
          }
        }).error(function () {
          self.setState({ loading: false, errors: [{ message: "Signup failed!", field: "email" }] });
        });
      } else {
        this.setState({ loading: false, errors: [{ message: "don't match", field: "password" }] });
      }
    }
  },
  renderBtn: function renderBtn() {
    if (this.state.loading) {
      return React.createElement(
        "button",
        { type: "submit", className: "btn" },
        React.createElement(
          LoadingEllipsis,
          null,
          "Signing Up"
        )
      );
    } else {
      return React.createElement(
        "button",
        { type: "submit", className: "btn btn-primary", onClick: this.signup },
        "Signup"
      );
    }
  },
  render: function render() {
    return React.createElement(
      "form",
      { onSubmit: this.signup },
      React.createElement(
        "h1",
        null,
        "Signup Form"
      ),
      React.createElement(TextField, { label: "First Name", value: this.state.firstName, errors: this.parseErrors("first_name"), onChange: this.handleFieldChange.bind(this, "firstName") }),
      React.createElement(TextField, { label: "Last Name", value: this.state.lastName, errors: this.parseErrors("last_name"), onChange: this.handleFieldChange.bind(this, "lastName") }),
      React.createElement(TextField, { label: "Email", value: this.state.email, errors: this.parseErrors("email"), onChange: this.handleFieldChange.bind(this, "email") }),
      React.createElement(PasswordField, { label: "Password", value: this.state.password, errors: this.parseErrors("password"), onChange: this.handleFieldChange.bind(this, "password") }),
      React.createElement(PasswordField, { label: "Confirm Password", value: this.state.confirmPassword, errors: this.parseErrors("password"), onChange: this.handleFieldChange.bind(this, "confirmPassword") }),
      this.renderBtn()
    );
  }
});

module.exports = SignupForm;
});

require.register("web/static/js/react/forms/text-field.js", function(exports, require, module) {
"use strict";

var TextField = React.createClass({
  displayName: "TextField",

  propTypes: {
    label: React.PropTypes.string.isRequired,
    value: React.PropTypes.string,
    errors: React.PropTypes.array,
    onChange: React.PropTypes.func.isRequired
  },

  handleChange: function handleChange(e) {
    this.props.onChange(e.target.value);
  },
  renderErrors: function renderErrors() {
    if (this.props.errors) {
      return this.props.errors.map(function (error, index) {
        if (typeof error != "undefined") {
          return React.createElement(
            "div",
            { key: index, className: "error" },
            error.message
          );
        }
      });
    }
  },
  render: function render() {

    return React.createElement(
      "div",
      { className: "form-group" },
      React.createElement(
        "label",
        { className: "control-label" },
        this.props.label
      ),
      React.createElement("input", { type: "text", className: "form-control", value: this.props.value, onChange: this.handleChange }),
      React.createElement(
        "div",
        { className: "errors" },
        this.renderErrors()
      )
    );
  }
});

module.exports = TextField;
});

require.register("web/static/js/react/loading-ellipsis.js", function(exports, require, module) {
"use strict";

var LoadingEllipsis = React.createClass({
  displayName: "LoadingEllipsis",

  dotInterval: null,

  getInitialState: function getInitialState() {
    return {
      dotCount: 0,
      dots: ''
    };
  },
  componentDidMount: function componentDidMount() {
    this.dotInterval = setInterval(this.updateDots, 500);
  },
  componentWillUnmount: function componentWillUnmount() {
    clearInterval(this.dotInterval);
  },
  updateDots: function updateDots() {
    var count = this.state.dotCount + 1;
    if (count >= 4) count = 0;
    var dots = ".".repeat(count);
    this.setState({ dotCount: count, dots: dots });
  },
  render: function render() {
    return React.createElement(
      "span",
      { className: "loading-ellipsis" },
      this.props.children || 'loading',
      React.createElement(
        "span",
        { className: "dot-holder" },
        React.createElement(
          "span",
          { className: "invisi-dots" },
          "..."
        ),
        React.createElement(
          "span",
          { className: "dots" },
          this.state.dots
        )
      )
    );
  }
});

module.exports = LoadingEllipsis;
});

require.register("web/static/js/react/nav-bar.js", function(exports, require, module) {
"use strict";

var _reactRouter = require("react-router");

var NavBar = React.createClass({
  displayName: "NavBar",

  propTypes: {},

  getInitialState: function getInitialState() {
    return {
      isLoggedIn: false,
      menuOpen: false
    };
  },
  componentDidMount: function componentDidMount() {
    window.AuthStore.subscribe(this.receiveState);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.AuthStore.unsubscribe(this.receiveState);
  },
  receiveState: function receiveState(authState) {
    this.setState({
      isLoggedIn: authState.isLoggedIn
    });
  },
  openMenu: function openMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  },
  handleLogout: function handleLogout() {
    window.Dispatcher.logout();
  },
  renderLogo: function renderLogo() {
    return React.createElement(
      "li",
      null,
      React.createElement(
        _reactRouter.Link,
        { to: "/" },
        React.createElement("img", { src: "/images/logo.png", alt: "WhosAble" })
      )
    );
  },
  renderMenuBtn: function renderMenuBtn() {
    var menuClass = "";
    if (this.state.menuOpen) {
      menuClass = "open";
    }

    return React.createElement(
      "li",
      null,
      React.createElement(
        "div",
        { id: "menu-btn", className: menuClass, onClick: this.openMenu },
        React.createElement("span", null),
        React.createElement("span", null),
        React.createElement("span", null),
        React.createElement("span", null)
      )
    );
  },
  renderMenu: function renderMenu() {
    var menuClass = "";
    if (this.state.menuOpen) {
      menuClass = "open";
    }
    if (this.state.isLoggedIn) {
      menuClass += " app-menu";
    }

    if (this.state.isLoggedIn) {
      return React.createElement(
        "ul",
        { id: "menu", className: menuClass },
        React.createElement(
          "li",
          null,
          React.createElement(
            _reactRouter.Link,
            { to: "/app" },
            React.createElement("i", { className: "fa fa-tachometer" }),
            "Dashboard"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            _reactRouter.Link,
            { to: "/app/jobs" },
            React.createElement("i", { className: "fa fa-briefcase" }),
            "Jobs"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            _reactRouter.Link,
            { to: "/app/contacts" },
            React.createElement("i", { className: "fa fa-users" }),
            "Contacts"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            "a",
            { href: "javascript:;", onClick: this.handleLogout },
            React.createElement("i", { className: "fa fa-sign-out" }),
            "Logout"
          )
        )
      );
    } else {
      return React.createElement(
        "ul",
        { id: "menu", className: menuClass },
        React.createElement(
          "li",
          null,
          React.createElement(
            _reactRouter.Link,
            { to: "/signup" },
            React.createElement("i", { className: "fa fa-plus" }),
            "Signup"
          )
        ),
        React.createElement(
          "li",
          null,
          React.createElement(
            _reactRouter.Link,
            { to: "/login" },
            React.createElement("i", { className: "fa fa-sign-in" }),
            "Login"
          )
        )
      );
    }
  },
  render: function render() {
    return React.createElement(
      "div",
      { id: "nav-bar" },
      React.createElement(
        "ul",
        { id: "nav-bar-items" },
        this.renderLogo(),
        this.renderMenuBtn()
      ),
      this.renderMenu()
    );
  }
});

module.exports = NavBar;
});

require.register("web/static/js/react/pages/connection-status.js", function(exports, require, module) {
"use strict";

var NavBar = require("../nav-bar");

var ConnectionStatus = React.createClass({
  displayName: "ConnectionStatus",
  getInitialState: function getInitialState() {
    return {
      connected: false,
      pollingAttempts: 0
    };
  },
  componentDidMount: function componentDidMount() {
    window.AuthStore.subscribe(this.receiveState);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.AuthStore.unsubscribe(this.receiveState);
  },
  receiveState: function receiveState(authState) {
    this.setState({
      connected: authState.isSocketConnected,
      pollingAttempts: authState.pollingAttempts
    });
  },
  handleLogin: function handleLogin() {
    window.Dispatcher.logout();
    window.location.href = "/login";
  },
  renderFailure: function renderFailure() {
    if (!this.state.connected && this.state.pollingAttempts > 4) {
      return React.createElement(
        "div",
        { id: "connection-status-overlay" },
        React.createElement(
          "div",
          { id: "connection-status-content" },
          React.createElement(
            "div",
            { className: "flex-container" },
            React.createElement(
              "div",
              { className: "flex-left" },
              React.createElement("i", { className: "fa fa-plug" })
            ),
            React.createElement(
              "div",
              { className: "flex-right" },
              React.createElement(
                "h3",
                null,
                "Sorry!"
              ),
              React.createElement(
                "p",
                { className: "description" },
                "Your connection was lost.",
                React.createElement("br", null),
                "I wonder how that happened..."
              ),
              React.createElement(
                "p",
                null,
                "Wait"
              ),
              React.createElement(
                "h4",
                null,
                "OR"
              ),
              React.createElement(
                "p",
                { id: "cta", onClick: this.handleLogin },
                "Login again"
              )
            )
          )
        )
      );
    }
  },
  render: function render() {
    return React.createElement(
      "div",
      { id: "connection-status-wrapper" },
      this.renderFailure(),
      this.props.children
    );
  }
});

module.exports = ConnectionStatus;
});

require.register("web/static/js/react/pages/contacts-page.js", function(exports, require, module) {
"use strict";

var _reactRouter = require("react-router");

var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");


var ContactsPage = React.createClass({
  displayName: "ContactsPage",
  handleCreate: function handleCreate() {
    _reactRouter.browserHistory.push("/app/contacts/new");
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, null),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "main",
          { role: "main" },
          React.createElement(CreateBtn, { title: "Create a new Contact", onCreate: this.handleCreate })
        )
      )
    );
  }
});

module.exports = ContactsPage;
});

require.register("web/static/js/react/pages/dashboard-page.js", function(exports, require, module) {
"use strict";

var _reactRouter = require("react-router");

var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");


var DashboardPage = React.createClass({
  displayName: "DashboardPage",
  getInitialState: function getInitialState() {
    return {
      services: null
    };
  },
  handleCreate: function handleCreate() {
    _reactRouter.browserHistory.push("/app/jobs/new");
  },
  componentDidMount: function componentDidMount() {
    window.ServiceStore.subscribe(this.receiveState);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveState);
  },
  receiveState: function receiveState(services) {
    this.setState({ services: services });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, null),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "main",
          { role: "main" },
          React.createElement(CreateBtn, { title: "Create a new Job", onCreate: this.handleCreate })
        )
      )
    );
  }
});

module.exports = DashboardPage;
});

require.register("web/static/js/react/pages/home-page.js", function(exports, require, module) {
"use strict";

var NavBar = require("../nav-bar");
var SignupForm = require("../forms/signup-form");

var HomePage = React.createClass({
  displayName: "HomePage",

  propTypes: {},

  getInitialState: function getInitialState() {
    return {
      isLoggedIn: false
    };
  },
  componentDidMount: function componentDidMount() {
    window.AuthStore.subscribe(this.receiveState);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.AuthStore.unsubscribe(this.receiveState);
  },
  receiveState: function receiveState(authState) {
    this.setState({
      isLoggedIn: authState.isLoggedIn
    });
  },
  renderSignupForm: function renderSignupForm() {
    if (!this.state.isLoggedIn) {
      return React.createElement(SignupForm, null);
    }
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, { isLoggedIn: this.state.isLoggedIn }),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "main",
          { role: "main" },
          React.createElement(
            "div",
            null,
            "Home Page Placeholder"
          ),
          this.renderSignupForm()
        )
      )
    );
  }
});

module.exports = HomePage;
});

require.register("web/static/js/react/pages/jobs-page.js", function(exports, require, module) {
"use strict";

var _reactRouter = require("react-router");

var CreateBtn = require("../create-btn");
var NavBar = require("../nav-bar");


var JobsPage = React.createClass({
  displayName: "JobsPage",
  handleCreate: function handleCreate() {
    _reactRouter.browserHistory.push("/app/jobs/new");
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, null),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "main",
          { role: "main" },
          React.createElement(CreateBtn, { title: "Create a new Job", onCreate: this.handleCreate })
        )
      )
    );
  }
});

module.exports = JobsPage;
});

require.register("web/static/js/react/pages/login-page.js", function(exports, require, module) {
"use strict";

var NavBar = require("../nav-bar");
var LoginForm = require("../forms/login-form");

var LoginPage = React.createClass({
  displayName: "LoginPage",

  propTypes: {},

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, null),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "main",
          { role: "main" },
          React.createElement(LoginForm, null)
        )
      )
    );
  }
});

module.exports = LoginPage;
});

require.register("web/static/js/react/pages/new-contact-page.js", function(exports, require, module) {
"use strict";

var NavBar = require("../nav-bar");

var NewContactPage = React.createClass({
  displayName: "NewContactPage",
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, null),
      "New Contact Form here"
    );
  }
});

module.exports = NewContactPage;
});

require.register("web/static/js/react/pages/new-job-page.js", function(exports, require, module) {
"use strict";

var NavBar = require("../nav-bar");
var JobForm = require("../forms/job-form");
var JobType = require("../forms/jobtype");
var NewJobPage = React.createClass({
  displayName: "NewJobPage",
  getInitialState: function getInitialState() {
    return {
      form: "job",
      type: null
    };
  },
  handleformchange: function handleformchange() {
    this.setState({ form: "type" });
  },
  handlesavetypeform: function handlesavetypeform() {
    this.setState({ form: "job" });
  },
  renderform: function renderform() {
    if (this.state.form == "job") {
      return React.createElement(JobForm, { onformchange: this.handleformchange });
    } else {
      return React.createElement(JobType, { onformchange: this.handlesavetypeform });
    }
  },
  componentDidMount: function componentDidMount() {
    window.ServiceStore.subscribe(this.receiveState);
  },
  componentWillUnmount: function componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveState);
  },
  receiveState: function receiveState(services) {
    this.setState({ services: services });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, null),
      this.renderform()
    );
  }
});

module.exports = NewJobPage;
});

require.register("web/static/js/react/pages/not-found-page.js", function(exports, require, module) {
"use strict";

var NavBar = require("../nav-bar");

var NotFoundPage = React.createClass({
  displayName: "NotFoundPage",

  propTypes: {},

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, null),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "main",
          { role: "main" },
          React.createElement(
            "h1",
            null,
            "404- Page Not Found"
          )
        )
      )
    );
  }
});

module.exports = NotFoundPage;
});

require.register("web/static/js/react/pages/signup-page.js", function(exports, require, module) {
"use strict";

var NavBar = require("../nav-bar");
var SignupForm = require("../forms/signup-form");

var SignupPage = React.createClass({
  displayName: "SignupPage",

  propTypes: {},

  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(NavBar, null),
      React.createElement(
        "div",
        { className: "container" },
        React.createElement(
          "main",
          { role: "main" },
          React.createElement(SignupForm, null)
        )
      )
    );
  }
});

module.exports = SignupPage;
});

require.register("web/static/js/socket.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phoenix = require("phoenix");

var socket = new _phoenix.Socket("/account_socket", { params: { token: window.userToken } });

socket.connect();

// Now that you are connected, you can join channels with a topic:
var channel = socket.channel("topic:subtopic", {});
channel.join().receive("ok", function (resp) {
  console.log("Joined successfully", resp);
}).receive("error", function (resp) {
  console.log("Unable to join", resp);
});

exports.default = socket;
});

;require.register("web/static/js/stores/auth-store.js", function(exports, require, module) {
"use strict";

var _phoenix = require("phoenix");

module.exports = {
  token: sessionStorage.getItem("token"),
  userID: sessionStorage.getItem("userID"),
  accountID: sessionStorage.getItem("accountID"),
  hashLocation: null,
  socket: null,
  channel: null,
  pollingInterval: null,
  pollingAttempts: 0,
  pollingConnected: false,
  callBacks: [],

  subscribe: function subscribe(callBack) {
    window.AuthStore.callBacks.push(callBack);
    window.AuthStore.sendCallBack(callBack);
  },
  unsubscribe: function unsubscribe(callBack) {
    var i = window.AuthStore.callBacks.indexOf(callBack);
    if (i != -1) {
      window.AuthStore.callBacks.splice(i, 1);
    }
  },
  sendCallBacks: function sendCallBacks() {
    window.AuthStore.callBacks.forEach(function (callBack) {
      if (callBack && typeof callBack === "function") {
        window.AuthStore.sendCallBack(callBack);
      }
    });
  },
  sendCallBack: function sendCallBack(callBack) {
    callBack({
      isLoggedIn: window.AuthStore.isLoggedIn(),
      userID: window.AuthStore.userID,
      accountID: window.AuthStore.accountID,
      isSocketConnected: window.AuthStore.isSocketConnected(),
      pollingAttempts: window.AuthStore.pollingAttempts
    });
  },
  isLoggedIn: function isLoggedIn() {
    return !!window.AuthStore.token && !!window.AuthStore.accountID && !!window.AuthStore.userID;
  },
  setSession: function setSession(loginResponse) {
    sessionStorage.setItem("token", loginResponse.token);
    sessionStorage.setItem("userID", loginResponse.user_id);
    sessionStorage.setItem("accountID", loginResponse.account_id);
    window.AuthStore.token = loginResponse.token;
    window.AuthStore.userID = loginResponse.user_id;
    window.AuthStore.accountID = loginResponse.account_id;
    window.AuthStore.connectSocket();
    window.AuthStore.sendCallBacks();
  },
  clearSession: function clearSession() {
    sessionStorage.clear();

    window.AuthStore.token = null;
    window.AuthStore.userID = null;
    window.AuthStore.accountID = null;
    window.AuthStore.sendCallBacks();
  },
  isSocketConnected: function isSocketConnected() {
    return window.AuthStore.socket && window.AuthStore.socket.isConnected();
  },
  pollConnection: function pollConnection() {
    if (window.AuthStore.isSocketConnected()) {
      if (!window.AuthStore.pollingConnected) {
        window.AuthStore.pollingConnected = true;
        window.AuthStore.sendCallBacks();
      }
    } else {
      window.AuthStore.pollingConnected = false;
      window.AuthStore.pollingAttempts++;
      window.AuthStore.sendCallBacks();
    }
  },
  connectSocket: function connectSocket() {
    if (window.AuthStore.isLoggedIn() && !window.AuthStore.socket) {
      window.AuthStore.pollingInterval = setInterval(window.AuthStore.pollConnection, 500);

      window.AuthStore.socket = new _phoenix.Socket("/account_socket", { params: { token: window.AuthStore.token } });
      window.AuthStore.socket.connect();

      window.AuthStore.channel = window.AuthStore.socket.channel("account:" + window.AuthStore.accountID, { token: window.AuthStore.token });
      window.AuthStore.channel.join().receive("ok", function (resp) {
        console.log("Joined successfully", resp);
      }).receive("error", function (resp) {
        console.log("Unable to join", resp);
      });
    }
  }
};
});

require.register("web/static/js/stores/service-store.js", function(exports, require, module) {
"use strict";

var _phoenix = require("phoenix");

module.exports = {
  services: {},
  callBacks: [],

  subscribe: function subscribe(callBack) {
    window.ServiceStore.connectToChannel();
    window.ServiceStore.callBacks.push(callBack);
    window.ServiceStore.sendCallBack(callBack);
  },
  unsubscribe: function unsubscribe(callBack) {
    var i = window.ServiceStore.callBacks.indexOf(callBack);
    if (i != -1) {
      window.ServiceStore.callBacks.splice(i, 1);
    }
  },
  sendCallBacks: function sendCallBacks() {
    window.ServiceStore.callBacks.forEach(function (callBack) {
      if (callBack && typeof callBack === "function") {
        window.ServiceStore.sendCallBack(callBack);
      }
    });
  },
  sendCallBack: function sendCallBack(callBack) {
    callBack(window.ServiceStore.services);
  },
  addNewService: function addNewService(service) {
    window.ServiceStore.services[service.id] = service;
    window.ServiceStore.sendCallBacks();
  },
  refreshServices: function refreshServices(services) {
    var newServices = {};
    services.forEach(function (service) {
      newServices[service.id] = service;
    });
    window.ServiceStore.services = newServices;
    window.ServiceStore.sendCallBacks();
  },
  connectToChannel: function connectToChannel() {
    if (window.AuthStore.isLoggedIn() && window.AuthStore.channel && Object.keys(window.ServiceStore.services).length === 0) {
      window.AuthStore.channel.on("new_service", function (service) {
        window.ServiceStore.addNewService(service);
      });
      window.AuthStore.channel.on("all_services", function (response) {
        window.ServiceStore.refreshServices(response.services);
      });
      window.AuthStore.channel.push("request_services", {});
    }
  }
};
});

require.alias("phoenix/priv/static/phoenix.js", "phoenix");
require.alias("react/react.js", "react");
require.alias("react-router/lib/index.js", "react-router");
require.alias("phoenix_html/priv/static/phoenix_html.js", "phoenix_html");
require.alias("invariant/browser.js", "invariant");
require.alias("warning/browser.js", "warning");
require.alias("history/lib/index.js", "history");
require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');

require('web/static/js/app');
//# sourceMappingURL=app.js.map