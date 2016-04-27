var PasswordField = require("./password-field");
var TextField = require("./text-field");

var LoginForm = React.createClass({
  getInitialState() {
    return {
      email: null,
      password: null,
      errors: []
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

    var response = window.Dispatcher.login(this.state.email, this.state.password)
      .done(function(response) {
        if(response.status == "failure") {
          self.setState({errors: response.errors});
        }
      }).error(function() {
        self.setState({errors: [{message: "Authentication failed!", field: "password"}]});
      });
  },

  parseErrors(field) {
    if(this.state.errors.length == 0) { return []; }

    return this.state.errors.map(function(error) {
      if(error.field == field) { return error; }
    });
  },

  render() {
    return(
      <form onSubmit={ this.login }>
        <h1>Login Form</h1>
        <TextField label="Email" value={ this.state.email } errors={ this.parseErrors("email") } onChange={ this.handleFieldChange.bind(this, "email") }/>
        <PasswordField label="Password" value={ this.state.password } errors={ this.parseErrors("password") } onChange={ this.handleFieldChange.bind(this, "password") }/>
        <button type="submit" className="btn btn-primary" onClick={ this.login }>Login</button>
      </form>
    );
  }
});

module.exports = LoginForm;
