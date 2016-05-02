var JobType = React.createClass({

  render() {
    return(
<div>
Service Type:
<br/><br/>
<form>
<textarea name="message" rows="5" cols="15">
Example: Dinner Server
</textarea>
</form>
      <br/><br/>
      <div className="btn btn-primary" onClick={this.props.onformchange}>Submit Service Type</div>
</div>
    );
  }
});

module.exports = JobType;
