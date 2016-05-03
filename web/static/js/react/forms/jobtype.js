var JobType = React.createClass({
handleCreate() {
  window.Dispatcher.createService(this.state.servicetype)
    .receive("ok", (resp) => {
      this.setState({serviceID: resp.service_id});
    }).receive("error", (resp) => {
      this.setState({errors: resp.errors});
    });
  },
  render() {
    return(
<div>
Service Type:
<br/><br/>
<form>

<input type="text" placeholder="Example: Dinner Server"/>
</form>
      <br/><br/>
      <div className="btn btn-primary" onClick={this.props.onformchange}>Submit Service Type</div>
</div>
    );
  }
});

module.exports = JobType;
