var TextField = require("./text-field");
var LoadingEllipsis = require("../loading-ellipsis");

var LocationForm = React.createClass({
  propTypes: {
    onCreate: React.PropTypes.func.isRequired
  },

  getInitialState() {
    return {
      address: "",
      city: "",
      state: "",
      zip: "",
      errors: [],
      loading: false
    };
  },

  createLocation(e) {
    e.preventDefault();
    var location = {
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip
    }
    window.Dispatcher.createLocation(location)
      .receive("ok", (resp) => {
        this.props.onCreate(resp.location_id);
      }).receive("error", (resp) => {
        this.setState({errors: resp.errors});
      });
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
          <LoadingEllipsis>Creating Location</LoadingEllipsis>
        </button>
      );
    } else {
      return(<button type="submit" className="btn btn-primary pull-right" style={{marginTop: "25px"}} onClick={ this.createLocation }>Create Location</button>);
    }
  },

  render() {
    return(
      <form onSubmit={ this.createLocation }>
        <div className="row">
          <div className="col-xs-12">
            <TextField label="Address" value={ this.state.address } errors={ this.parseErrors("address") } onChange={ this.handleFieldChange.bind(this, "address") }/>
          </div>
          <div className="col-xs-12">
            <TextField label="City" value={ this.state.city } errors={ this.parseErrors("city") } onChange={ this.handleFieldChange.bind(this, "city") }/>
          </div>
          <div className="col-xs-12">
            <TextField label="State" value={ this.state.state } errors={ this.parseErrors("state") } onChange={ this.handleFieldChange.bind(this, "state") }/>
          </div>
          <div className="col-xs-12">
            <TextField label="Zip" value={ this.state.zip } errors={ this.parseErrors("zip") } onChange={ this.handleFieldChange.bind(this, "zip") }/>
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

module.exports = LocationForm;
