var TextField = require("./text-field");

var LoginForm = React.createClass({
  getInitialState() {
    return {
      email: null,
      password: null,
      errors: []
    };
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
        self.setState({errors: [{message: "Authentication failed!"}]});
      });
  },

  handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },

  renderErrors() {
    if(this.state.errors.length > 0) {
      return this.state.errors.map(function(error) {
        return(<div className="error">{ error.message }</div>);
      });
    }
  },

  render() {
    return(
      <form onSubmit={ this.login }>
        { this.renderErrors() }
        <TextField label="Email" type="text" value={ this.state.email } onChange={ this.handleFieldChange.bind(this, "email") }/>
        <TextField label="Password" type="password" value={ this.state.password } onChange={ this.handleFieldChange.bind(this, "password") }/>
        <button type="submit" className="btn btn-primary" onClick={ this.login }>Login</button>
      </form>
    );
  }
});

module.exports = LoginForm;
