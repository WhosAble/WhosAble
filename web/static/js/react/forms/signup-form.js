var PasswordField = require("./password-field");
var TextField = require("./text-field");
var LoadingEllipsis = require("../loading-ellipsis");

var SignupForm = React.createClass({
  getInitialState() {
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

  handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },

  parseErrors(field) {
    if(this.state.errors.length == 0) { return []; }

    return this.state.errors.map(function(error) {
      if(error.field == field) { return error; }
    });
  },

  signup(e) {
    e.preventDefault();
    var self = this;

    if(this.state.loading == false) {
      this.setState({loading: true});

      if(this.state.password == this.state.confirmPassword) {
        var response = window.Dispatcher.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
          .done(function(response) {
            if(response.status == "failure") {
              self.setState({loading: false, errors: response.errors});
            } else if(response["status"] == "success") {
              window.Dispatcher.login(self.state.email, self.state.password);
            }
          }).error(function() {
            self.setState({loading: false, errors: [{message: "Signup failed!", field: "email"}]});
          });
      } else {
        this.setState({loading: false, errors: [{message:"don't match", field:"password"}]});
      }
    }
  },

  renderBtn() {
    if(this.state.loading) {
      return(
        <button type="submit" className="btn">
          <LoadingEllipsis>Signing Up</LoadingEllipsis>
        </button>
      );
    } else {
      return(<button type="submit" className="btn btn-primary" onClick={ this.signup }>Submit</button>);
    }
  },

  render() {
    return(
      <form onSubmit={ this.signup }>
        <h1>Signup Form</h1>
        <TextField label="First Name" value={ this.state.firstName } errors={ this.parseErrors("first_name") } onChange={ this.handleFieldChange.bind(this, "firstName") }/>
        <TextField label="Last Name" value={ this.state.lastName } errors={ this.parseErrors("last_name") } onChange={ this.handleFieldChange.bind(this, "lastName") }/>
        <TextField label="Email" value={ this.state.email } errors={ this.parseErrors("email") } onChange={ this.handleFieldChange.bind(this, "email") }/>
        <PasswordField label="Password" value={ this.state.password } errors={ this.parseErrors("password") } onChange={ this.handleFieldChange.bind(this, "password") }/>
        <PasswordField label="Confirm Password" value={ this.state.confirmPassword } errors={ this.parseErrors("password") } onChange={ this.handleFieldChange.bind(this, "confirmPassword") }/>
        { this.renderBtn() }
      </form>
    );
  }
});

module.exports = SignupForm;
