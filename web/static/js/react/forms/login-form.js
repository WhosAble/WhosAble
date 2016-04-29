var PasswordField = require("./password-field");
var TextField = require("./text-field");
var LoadingEllipsis = require("../loading-ellipsis");

var LoginForm = React.createClass({
  getInitialState() {
    return {
      email: null,
      password: null,
      errors: [],
      loading: false
    };
  },

  handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },

  login(e) {
    e.preventDefault();
    var self = this;
    if(this.state.loading == false) {
      this.setState({loading: true});

      var response = window.Dispatcher.login(this.state.email, this.state.password)
        .done(function(response) {
          if(response.status == "failure") {
            self.setState({loading: false, errors: [{message: "Authentication failed!", field: "password"}]});
          }
        }).error(function() {
          self.setState({loading: false, errors: [{message: "Authentication failed!", field: "password"}]});
        });
    }
  },

  parseErrors(field) {
    if(this.state.errors.length == 0) { return []; }

    return this.state.errors.map(function(error) {
      if(error.field == field) { return error; }
    });
  },

  renderBtn() {
    if(this.state.loading) {
      return(
        <button type="submit" className="btn">
          <LoadingEllipsis>Logging In</LoadingEllipsis>
        </button>
      );
    } else {
      return(<button type="submit" className="btn btn-primary" onClick={ this.login }>Login</button>);
    }
  },

  render() {
    return(
      <form onSubmit={ this.login }>
        <h1>Login Form</h1>
        <TextField label="Email" value={ this.state.email } errors={ this.parseErrors("email") } onChange={ this.handleFieldChange.bind(this, "email") }/>
        <PasswordField label="Password" value={ this.state.password } errors={ this.parseErrors("password") } onChange={ this.handleFieldChange.bind(this, "password") }/>
        { this.renderBtn() }
      </form>
    );
  }
});

module.exports = LoginForm;
