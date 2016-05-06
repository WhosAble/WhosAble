var TextField = require("./text-field");
var PhoneField = require("./phone-field");
var LoadingEllipsis = require("../loading-ellipsis");

var ContactForm = React.createClass({
  getInitialState() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "--",
      hourlyRate: 0,
      errors: [],
      loading: false
    };
  },

  createContact(e) {
    e.preventDefault();
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

  renderBtn() {
    if(this.state.loading) {
      return(
        <button type="submit" className="btn">
          <LoadingEllipsis>Logging In</LoadingEllipsis>
        </button>
      );
    } else {
      return(<button type="submit" className="btn btn-primary pull-right" style={{marginTop: "25px"}} onClick={ this.createContact }>Create Contact</button>);
    }
  },

  render() {
    return(
      <form onSubmit={ this.login }>
        <div className="row">
          <div className="col-xs-6">
            <TextField label="First Name" value={ this.state.firstName } errors={ this.parseErrors("first_name") } onChange={ this.handleFieldChange.bind(this, "firstName") }/>
          </div>
          <div className="col-xs-6">
            <TextField label="Last Name" value={ this.state.lastName } errors={ this.parseErrors("last_name") } onChange={ this.handleFieldChange.bind(this, "lastName") }/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6">
            <TextField label="Email" value={ this.state.email } errors={ this.parseErrors("email") } onChange={ this.handleFieldChange.bind(this, "email") }/>
          </div>
          <div className="col-xs-12 col-md-6">
            <PhoneField label="Phone" value={ this.state.phone } errors={ this.parseErrors("phone") } onChange={ this.handleFieldChange.bind(this, "phone") }/>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12">
            { this.renderBtn() }
          </div>
        </div>
      </form>
    );
  }
});

module.exports = ContactForm;
