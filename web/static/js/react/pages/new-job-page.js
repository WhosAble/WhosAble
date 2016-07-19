var JobForm = require("../forms/job-form");
var JobType = require("../forms/jobtype");
var LocationForm = require("../forms/location-form");
var ContactForm = require("../forms/contact-form");
var AllServices = require("../all-services");
var AllLocations = require("../all-locations");
import {browserHistory} from 'react-router';

var NewJobPage = React.createClass({
  getInitialState() {
    return {
      services: null,
      serviceID: null,
      locations: null,
      locationID: null,
      contacts: null,
      selectedContactIDs: [],
      startTime: moment().add(1, 'day'),
      endTime: moment().add(2, 'day'),
      form: "job",
      type: null
    };
  },

  componentWillMount() {
    window.ServiceStore.subscribe(this.receiveServices);
    window.AddressStore.subscribe(this.receiveLocations);
    window.ContactsStore.subscribe(this.receiveContacts);
  },

  componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveServices);
    window.AddressStore.unsubscribe(this.receiveLocations);
    window.ContactsStore.unsubscribe(this.receiveContacts);
  },

  receiveContacts(contacts) {
    var newState = {contacts: contacts};
    if(this.props.serviceID != null) {
      newState.selectedContactIDs = this.allContactIDs();
    }
    this.setState(newState);
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
    if(this.state.contacts != null) {
      newState.selectedContactIDs = this.allContactIDs();
    }
    this.setState(newState);
  },

  handleFormChange(form, ID) {
    // TODO: Do something with the ID
    this.setState({form: form});
  },

  componentDidMount() {
    window.ServiceStore.subscribe(this.receiveState);
  },

  componentWillUnmount() {
    window.ServiceStore.unsubscribe(this.receiveState);
  },

  receiveState(services) {
    this.setState({services: services});
  },

  handleCreateService(serviceID) {
    this.setState({
      serviceID: serviceID,
      form: "job"
    });
  },

  handleNewService() {
    this.setState({form: "new-type"});
  },

  handleSelectService(serviceID) {
    this.setState({
      serviceID: serviceID,
      form: "job"
    });
  },

  handleNewLocation() {
    this.setState({form: "new-location"});
  },

  handleSelectLocation(locationID) {
    this.setState({
      locationID: locationID,
      form: "job"
    });
  },

  handleCreateLocation(locationID) {
    this.setState({
      locationID: locationID,
      form: "job"
    });
  },

  allContactIDs() {
   var filteredContactIDs = [];
   this.state.contacts.forEach((contact) => {
     if(contact.service_id == this.state.serviceID) {
       filteredContactIDs.push(contact.id);
     }
   });
   return filteredContactIDs;
  },

  render() {
    if(this.state.form == "job") {
      return(
        <div style={{marginTop: "15px"}}>
          <JobForm services={this.state.services} serviceID={this.state.serviceID} locations={this.state.locations} locationID={this.state.locationID } contacts={this.state.contacts} allContactIDs={this.allContactIDs()} selectedContactIDs={this.state.selectedContactIDs} startTime={this.state.startTime} endTime={this.state.endTime} onFormChange={this.handleFormChange}/>
        </div>
      );
    } else if(this.state.form == "new-type") {
      return <JobType onCreate={this.handleCreateService}/>
    } else if(this.state.form == "type") {
      return(<AllServices onNew={this.handleNewService} onSelect={this.handleSelectService}/>);
    } else if(this.state.form == "contacts") {
      return(<ContactForm onCreate={this.handleFormChange.bind(this, "job")}/>);
    } else if(this.state.form == "new-location") {
      return(<LocationForm onCreate={this.handleCreateLocation}/>);
    } else {
      return(<AllLocations onNew={this.handleNewLocation} onSelect={this.handleSelectLocation}/>);
    }
  }
});

module.exports = NewJobPage;
