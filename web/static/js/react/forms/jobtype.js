var TextField = require("./text-field");

var JobType = React.createClass({
  getInitialState() {
    return {
      servicetype: null,
      errors: []
    };
  },

  handleCreate(e) {
    e.preventDefault();
    window.Dispatcher.createService(this.state.servicetype)
    .receive("ok", (resp) => {
      this.props.onCreate(resp.service_id)
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

  render() {
    return(
      <div style={{marginTop: "50px"}}>
        <form onSubmit={ this.handleCreate }>
          <TextField label="Service Type" value={ this.state.servicetype } errors={ this.parseErrors("name") } onChange={ this.handleFieldChange.bind(this, "servicetype") }/>
          <button className="btn btn-primary" onClick={ this.handleCreate }>Save</button>
        </form>
      </div>
    );
  }
});

module.exports = JobType;
