var TextField = require("./text-field");
var JobType = React.createClass({
  getInitialState() {
    return {
      servicetype: null,
      errors: []
    };
  },
handleCreate() {
  window.Dispatcher.createService(this.state.servicetype)
    .receive("ok", (resp) => {
      this.setState({serviceID: resp.service_id});
    }).receive("error", (resp) => {
      this.setState({errors: resp.errors});
    });
    this.props.onformchange()
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
<div>
Service Type:
<br/><br/>
<form>
<TextField label="servicetype" value={ this.state.servicetype } errors={ this.parseErrors("servicetype") } onChange={ this.handleFieldChange.bind(this, "servicetype") }/>
</form>
      <br/><br/>
      <div className="btn btn-primary" onClick={this.handleCreate}>Submit Service Type</div>
</div>
    );
  }
});

module.exports = JobType;
