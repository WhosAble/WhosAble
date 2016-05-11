var JobForm = React.createClass({
  getInitialState() {
    return {
      services: null,
      serviceID: null
    };
  },

  componentDidMount() {
    window.ServiceStore.subscribe(this.receiveServices);
  },

  componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveServices);
  },

  receiveServices(services) {
    var newState = {services: services};
    if(this.state.serviceID == null && services.length > 0) {
      newState.serviceID = services[0].id;
    }
    this.setState(newState);
  },

  getSelectedService() {
    var self = this;
    var selectedService = null;
    this.state.services.forEach(function(service) {
      if(service.id == self.state.serviceID) {
        selectedService = service;
      }
    });
    return selectedService;
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

  switchToServiceTypeForm() {
    this.props.onFormChange("type");
  },

  renderServiceType() {
    if(this.state.services == null || this.state.services.length == 0) { return <noscript/> }

    var service = this.getSelectedService();
    return(
      <div>{service.name}</div>
    );
  },

  render() {
    return(
      <form id="JobForm">
        Describe the job:
        <br/>
        <br/>

        { this.renderServiceType() }

        <div className="btn btn-primary" onClick={this.switchToServiceTypeForm}>Service Type</div>

        <br/>
        <br/>
        <textarea name="startlocation" rows="4" cols="20"/>
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
        <textarea name="message" rows="15" cols="40"/>
        <br/><br/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
});

module.exports = JobForm;
