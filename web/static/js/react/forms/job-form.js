var JobForm = React.createClass({
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

  parseErrors(field) {
    if(this.state.errors.length == 0) { return []; }

    return this.state.errors.map(function(error) {
      if(error.field == field) { return error; }
    });
  },

  render() {
    return(
      <form id="JobForm">
      Describe the job:
      <br/>
      <br/>

      <div className="btn btn-primary" onClick={this.props.onformchange}>Service Type</div>

      <br/>
      <br/>
      <textarea name="startlocation" rows="4" cols="20">
      Start Location
      </textarea>
      <br/><br/>
      Start Date:
        <input type="date" name="startdate"/>
        End Date:
          <input type="date" name="enddate"/>
        <br/><br/>
      Select a start time:
        <input type="time" name="usr_time"/>
        Select an end time:
          <input type="time" name="usr_time"/>
      <br/><br/>
          <textarea name="message" rows="15" cols="40">
          Notes:
          </textarea>
      <br/><br/>
      <input type="submit" value="Submit"/>
      </form>

    );
  }
});

module.exports = JobForm;
