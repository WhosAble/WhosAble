var JobForm = React.createClass({
  getInitialState() {
    return {
      services: null,
      locations: null,
      serviceID: null,
      locationID: null
    };
  },

  componentDidMount() {
    window.ServiceStore.subscribe(this.receiveServices);
    window.AddressStore.subscribe(this.receiveLocations);
  },

  componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveServices);
    window.AddressStore.unsubscribe(this.receiveLocations);
  },

  receiveLocations(locations) {
    var newState = {locations: locations};
    if(this.state.locationID == null && locations.length > 0) {
      newState.locationID = locations[0].id;
    }
    this.setState(newState);
  },

  receiveServices(services) {
    var newState = {services: services};
    if(this.state.serviceID == null && services.length > 0) {
      newState.serviceID = services[0].id;
    }
    this.setState(newState);
  },

  getSelectedLocation() {
    var self = this;
    var selectedLocation = null;
    this.state.locations.forEach(function(location) {
      if(location.id == self.state.locationID) {
        selectedLocation = location;
      }
    });
    return selectedLocation;
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

  switchToLocationForm() {
    this.props.onFormChange("location");
  },

  switchToServiceTypeForm() {
    this.props.onFormChange("type");
  },

  renderLocation() {
    if(this.state.locations == null || this.state.locations.length <= 0) { return <noscript/> }

    var location = this.getSelectedLocation();
    return(
      <div>{location.address}</div>
    );
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

        { this.renderLocation() }
        <div className="btn btn-primary" onClick={this.switchToLocationForm}>Location</div>

        <br/>
        <br/>
        Start Date:
        <input type="date" name="startdate"/>
        End Date:
        <input type="date" name="enddate"/>
        <br/>
        <br/>
        Select a start time:
        <input type="time" name="usr_time"/>
        Select an end time:
        <input type="time" name="usr_time"/>
        <br/>
        <br/>
        <textarea name="message" rows="15" cols="40"/>
        <br/>
        <br/>
        <input type="submit" value="Submit"/>
      </form>
    );
  }
});

module.exports = JobForm;
