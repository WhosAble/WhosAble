var TextField = require("./text-field");

var SignupForm = React.createClass({
  getInitialState() {
    return {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      confirmPassword: null,
      errors: []
    };
  },

  signup(e) {
    e.preventDefault();
    var self = this;

    var response = window.Dispatcher.signup(this.state.firstName, this.state.lastName, this.state.email, this.state.password)
      .done(function(response) {
        if(response.status == "failure") {
          self.setState({errors: response.errors});
        }
      });
  },

  handleFieldChange(field, val) {
    var obj = {};
    obj[field] = val;
    this.setState(obj);
  },

  parseErrors(field) {
    if(this.state.errors.length == 0) {
      return [];
    } else {
      return this.state.errors.map(function(error) {
        if(error.field == field) {
          return error;
        }
      });
    }
  },

  render() {
    return(
      <form onSubmit={ this.signup }>
        <h1>Signup Form</h1>
        <TextField label="First Name" type="text" errors={ this.parseErrors("first_name") } value={ this.state.firstName } onChange={ this.handleFieldChange.bind(this, "firstName") }/>
        <fieldset className="form-group">
          <label htmlFor="formGroupInput">First Name  </label>
          <input type="text" className="form-control" id="formGroupInput" placeholder="First Name"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="formGroupInput2">Last Name  </label>
          <input type="text" className="form-control" id="formGroupInput2" placeholder="Last Name"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="InputEmail">Email address  </label>
          <input type="email" className="form-control" id="InputEmail" placeholder="Enter email"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="InputPassword">Password  </label>
          <input type="password" className="form-control" id="InputPassword" placeholder="Password"/>
        </fieldset>
        <fieldset className="form-group">
          <label htmlFor="InputPassword2">Confirm Password  </label>
          <input type="password" className="form-control" id="InputPassword2" placeholder="ConfirmPassword"/>
        </fieldset>
        <button type="submit" className="btn btn-primary" onClick={ this.signup }>Submit</button>
      </form>
    );
  }
});

module.exports = SignupForm;
